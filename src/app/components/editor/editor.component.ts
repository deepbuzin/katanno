import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FsService} from '../../services/fs.service';
import {DbService} from '../../services/db.service';
import {Entry} from '../../entities/entry';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
    private datasetId: string;
    private imgId: string;
    private img: Entry;

    private activeDS: Array<any>;
    private entries: Array<Entry> = [];

    constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private db: DbService, private fs: FsService) {
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
        this.db.fetchOne({ _id: id, type: 'Entry' }).then(img => {
            this.img = Entry.create(img);
        });
    }

    getActiveDS(id): void {
        this.db.fetchOne({ _id: id }).then(response => {
            this.activeDS = response;
        });
        this.db.fetchMany({_datasetId: id}).then(imgs => {
            this.sortEntries(imgs);
        });
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
