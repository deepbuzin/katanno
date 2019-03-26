import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';
import {Dataset} from '../../entities/dataset';
import {Entry} from '../../entities/entry';
import {DatasetRepo} from '../../repo/dataset.repo';
import {EntryRepo} from '../../repo/entry.repo';

declare const SVG: any;
import 'svg.js';
import '../../utils/customized.panzoom'
import 'svg.draw.js'

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
    private datasetId: string;
    private imgId: string;
    private imgEntry: Entry;

    private activeDs: Dataset;
    private entries: Array<Entry> = [];

    private svg: any;
    private img: any;
    private kps: Array<any>;

    constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private dsRepo: DatasetRepo, private entryRepo: EntryRepo) {
    }

    ngOnInit() {
        this.svg = SVG('svg-div').size(300, 300);
        this.kps = new Array<any>();
        this.route.params.subscribe(params => {
                this.datasetId = params['dataset'];
                this.imgId = params['img'];
                this.loadImg(this.imgId);
                this.getActiveDS(this.datasetId);
            }, error => {
                console.error(error);
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.datasetId.currentValue) {
            this.getActiveDS(changes.datasetId.currentValue);
        }
    }

    loadImg(id): void {
        this.entryRepo.fetchOneById(id).then(img => {
            this.imgEntry = img;
            this.img = this.svg.image('file://' + this.imgEntry.url, 300, 300);
            this.svg.panZoom({});
        });
    }

    drawKeypoints(): void {
        const target = this.svg.circle(10).fill('#ff00ff');
        this.img.mousemove(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            target.center(x, y);
        });
        target.click(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            const kp = this.svg.circle(10).fill('#00deff').center(x, y);
            this.kps.push(kp);
        });
    }

    drawBbox(): void {
        const target = this.svg.circle(10).fill('#ff00ff');
        this.img.mousemove(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            target.center(x, y);

        });

        const bbox = this.svg.rect().attr({
            'fill': '#00deff',
            'fill-opacity': 0.1,
            'stroke': '#83fff3',
            'stroke-width': 2
        });
        this.svg.mousedown(e => {
            bbox.draw(e);
        });
        this.svg.mouseup(e => {
            bbox.draw('stop', e);
        });

    }

    drawMask(): void {
        const mask = this.svg.polyline().attr({
            'fill-opacity': 0.0,
            'stroke': '#83fff3',
            'stroke-width': 2
        }).draw();

        mask.on('drawstart', e => {
            document.addEventListener('keydown', e => {
                if(e.code == 'Space') {
                    const points = mask.array();
                    const maskPolygon = this.svg.polygon(points)
                        .attr({
                            'fill': '#00deff',
                            'fill-opacity': 0.2,
                            'stroke': '#83fff3',
                            'stroke-width': 2
                        });
                    this.svg.off('keydown');
                    mask.draw('cancel');
                }
                if(e.code == 'Escape') {
                    this.svg.off('keydown');
                    mask.draw('cancel');
                }
            });
        });
    }

    getActiveDS(id): void {
        this.dsRepo.fetchOneById(id).then(ds => this.activeDs = ds);
        this.entryRepo.fetchAllByDatasetId(id).then(imgs => this.sortEntries(imgs));
    }

    sortEntries(imgs: Array<Entry>): void {
        this.entries.push(imgs.find((e, i, a) => {
                return e.id === this.imgId;
            })
        );
    }

    sanitize(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
