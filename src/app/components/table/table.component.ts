import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';
import { Dataset } from '../../entities/dataset';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    private fs: FsService;
    private db: DbService;
    private _entries: Array<Dataset>;
    private activeSet: string;

    @Input()
    set entries(entries: Array<Dataset>) {
        this._entries = entries || [];
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
        this.activeSet = (this._entries && this._entries[0]) ? this._entries[0].id : undefined;
    }
}
