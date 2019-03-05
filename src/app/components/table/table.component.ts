import { Component, OnInit } from '@angular/core';
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
    public entries: Array<string>;

    constructor() {
        this.fs = new FsService();
        this.db = new DbService();
    }

    ngOnInit() {
        // this.entries = this.fs.listDir();
        this.entries = this.db.fetchByCategory('folder')['path'];
    }
}
