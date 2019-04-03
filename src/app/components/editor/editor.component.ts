import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { Dataset } from '../../entities/dataset';
import { Entry } from '../../entities/entry';
import { DatasetRepo } from '../../repo/dataset.repo';
import { EntryRepo } from '../../repo/entry.repo';
import { Cat } from '../../entities/cat';
import { Keypoint } from '../../entities/keypoint';
import { Annotation } from '../../entities/annotation';

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

    private generateKeypoints = function* (kps: Array<string>) {
        for (let idx in kps) {
            if (parseInt(idx) < kps.length - 1) yield kps[idx];
            else return kps[idx]
        }
    };

    private activeCat: Cat;
    private activeAnno: Annotation;

    private fakeCats: Array<Cat> = [
        Cat.create({
            _id: '1337urgay1488',
            name: 'korean girl',
            hasBbox: false,
            hasKeypoints: true,
            keypointNames: ['snoot', 'right cheek', 'left cheek'],
            hasMask: false,
            hasCaption: false
        })
    ];

    constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private dsRepo: DatasetRepo, private entryRepo: EntryRepo) {
    }

    ngOnInit() {
        this.svg = SVG('svg-div').size(300, 300);
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

    drawKeypoints() {
        const kps: Array<Keypoint> = [];
        const kpGen = this.generateKeypoints(this.activeCat.keypointNames);

        const target = this.svg.circle(10).fill('#ff00ff');
        this.img.mousemove(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            target.center(x, y);
        });

        target.click(e => {
            const {x, y} = this.img.point(e.pageX, e.pageY);
            const kpCircle = this.svg.circle(10).fill('#00deff').center(x, y);

            const kpDesc = kpGen.next();

            kps.push(Keypoint.create({
                name: kpDesc.value,
                x: x,
                y: y,
                visible: true
            }));

            if (kpDesc.done) {
                this.img.off('mousemove');
                target.off('click');
                target.remove();
                this.saveKeypoints(kps);
            }
        });
    }

    saveKeypoints(kps: Array<Keypoint>) {
        this.activeAnno.keypoints = kps;
        this.imgEntry.annotations.push(this.activeAnno);
        // TODO save to DB
        // TODO save the whole svg hierarchy for editing purposes
    }

    drawBbox() {
        // const target = this.svg.circle(10).fill('#ff00ff');
        // this.img.mousemove(e => {
        //     const {x, y} = this.img.point(e.pageX, e.pageY);
        //     target.center(x, y);
        //
        // });

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

    drawMask() {
        const mask = this.svg.polyline().attr({
            'fill-opacity': 0.0,
            'stroke': '#83fff3',
            'stroke-width': 2
        });

        this.svg.on('mousedown', e => {
            if(e.button != 0) return;
            mask.draw(e);
        });

        const that = this;
        const handler = () => handleKeydown;
        const handleKeydown = function (e) {
            if(e.code == 'Space') {
                const points = mask.array();
                const maskPolygon = that.svg.polygon(points)
                    .attr({
                        'fill': '#00deff',
                        'fill-opacity': 0.2,
                        'stroke': '#83fff3',
                        'stroke-width': 2
                    });

                console.log(e);

                document.removeEventListener('keydown', handler());
                that.svg.off('mousedown');
                mask.draw('cancel');
                mask.draw('stop', e);
            }
            if(e.code == 'Escape') {
                document.removeEventListener('keydown', handler());
                that.svg.off('mousedown');
                mask.draw('cancel');
                mask.draw('stop', e);
            }
        };

        mask.on('drawstart', e => {
            document.addEventListener('keydown', handler());
        });
    }

    handleCatSelection(cat) {
        this.activeCat = cat;
        this.activeAnno = new Annotation();
        this.activeAnno.cat = cat;
    }

    getActiveDS(id) {
        this.dsRepo.fetchOneById(id).then(ds => this.activeDs = ds);
        this.entryRepo.fetchAllByDatasetId(id).then(imgs => this.sortEntries(imgs));
    }

    sortEntries(imgs: Array<Entry>) {
        this.entries.push(imgs.find((e, i, a) => {
                return e.id === this.imgId;
            })
        );
    }

    sanitize(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
