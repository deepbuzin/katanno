import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Dataset } from '../../entities/dataset';
import { Entry } from '../../entities/entry';
import { DatasetRepo } from '../../repo/dataset.repo';
import { EntryRepo } from '../../repo/entry.repo';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {
    private entries: Array<Entry>;
    private activeDataset: Dataset;

    @Input()
    datasetId: string;

    constructor(private sanitizer: DomSanitizer, private dsRepo: DatasetRepo, private entryRepo: EntryRepo) {
    }

    ngOnChanges(changes) {
        if (changes.datasetId.currentValue) {
            this.getDSById(changes.datasetId.currentValue);
        }
    }

    getDSById(id) {
        this.dsRepo.fetchOneById(id).then(ds => {
            this.activeDataset = ds;
            this.entryRepo.fetchAllByDatasetId(ds.id).then(e => this.entries = e );
        });
    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl('file://' + url);
    }

    ngOnInit() {
    }

}
