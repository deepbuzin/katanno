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
    private _entries: Array<Dataset>;
    private activeSet: string;

    @Input()
    set entries(entries: Array<Dataset>) {
        this._entries = entries || [];
    }
    @Output() activeDatasetId = new EventEmitter<string>();

    constructor(private db: DbService, private fs: FsService) {
    }

    chooseDataset(activeDataset) {
        this.activeSet = activeDataset._id;
        this.activeDatasetId.emit(activeDataset._id);
    }

    ngOnInit() {
        this.activeSet = (this._entries && this._entries[0]) ? this._entries[0].id : undefined;
    }
}
