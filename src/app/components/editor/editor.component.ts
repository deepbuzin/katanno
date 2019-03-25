import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Dataset} from '../../entities/dataset';
import {Entry} from '../../entities/entry';
import {DatasetRepo} from '../../repo/dataset.repo';
import {EntryRepo} from '../../repo/entry.repo';

declare const SVG: any;
import 'svg.js';
import 'svg.panzoom.js'
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

    loadImg(id) {
        this.entryRepo.fetchOneById(id).then(img => {
            this.imgEntry = img;
            this.svg = SVG('svg-div').size(300, 300);
            this.img = this.svg.image('file://' + this.imgEntry.url, 300, 300);
            // this.svg.panZoom({});
            // this.drawKeypoints();
            this.drawBbox();
        });
    }

    drawKeypoints() {
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

    drawBbox() {
        const targetHor = this.svg.line(0, 20, 300, 20).stroke({width: 2});
        const targetVert = this.svg.line(0, 0, 0, 300).stroke({width: 2});
        const target = this.svg.circle(10).fill('#ff00ff');
        this.img.mousemove(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            target.center(x, y);
            targetVert.x(x);
            targetHor.y(y);

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

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
