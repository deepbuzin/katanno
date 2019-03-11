import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Dataset} from '../../entities/dataset';
import {Entry} from '../../entities/entry';
import {DatasetRepo} from '../../repo/dataset.repo';
import {EntryRepo} from '../../repo/entry.repo';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
    private datasetId: string;
    private imgId: string;
    private img: Entry;

    private activeDs: Dataset;
    private entries: Array<Entry> = [];

    constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private dsRepo: DatasetRepo, private entryRepo: EntryRepo) {
    }

    ngOnInit() {
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
        this.entryRepo.fetchOneById(id).then(img => this.img = img);
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
