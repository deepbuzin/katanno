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
    private _entries: Array<any>;
    private activeSet: string;

    @Input()
    set entries(entries: Array<string>) {
        this._entries = entries || this.db.fetchAllByType('folder')['path'];
    }
    @Output() activeDatasetId = new EventEmitter<string>();

    constructor() {
        this.fs = FsService.instance;
        this.db = DbService.instance;
    }

    chooseDataset(activeDataset) {
        this.activeSet = activeDataset._id;
        this.activeDatasetId.emit(activeDataset._id);
    }

    ngOnInit() {
        // this.entries = this.fs.listDir();
        this.activeSet = this._entries[0]._id;
        console.log(this._entries);
    }
}
