import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FsService} from '../../services/fs.service';
import {DbService} from '../../services/db.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Entry} from '../../entities/entry';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {
    private entries;
    private activeDataSet;

    @Input()
    datasetId: string;

    constructor(private sanitizer: DomSanitizer, private db: DbService, private fs: FsService) {
    }

    ngOnChanges(changes) {
        if (changes.datasetId.currentValue) {
            this.getDSById(changes.datasetId.currentValue);
        }
    }

    getDSById(id) {
        this.db.fetchOne({_id: id}).then(data => {
            this.activeDataSet = data;
            this.db.fetchMany({ datasetId: data._id, type: 'Entry' }).then(imgs => {
                this.entries = imgs.map(i => Entry.create(i));
            });
        });
    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit() {
    }

}
