import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    private fs: FsService;
    private db: DbService;
    private _entries: Array<string>;
    private activeSet: string;

    @Input()
    set entries(entries: Array<string>) {
        this._entries = entries || this.db.fetchByCategory('folder')['path'];
    }
    @Output() activeDatasetId = new EventEmitter<string>();

    constructor() {
        this.fs = new FsService();
        this.db = new DbService();
    }

    chooseDataset(activeDataset) {
        this.activeSet = activeDataset.id;
        this.activeDatasetId.emit(activeDataset.id);
    }

    ngOnInit() {
        // this.entries = this.fs.listDir();
        console.log(this._entries);
    }
}
