import {Component, OnInit} from '@angular/core';
import {FSService} from '../../services/fs.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    private fs: FSService;
    public entries: Array<string>;

    constructor() {
        this.fs = new FSService();
    }

    ngOnInit() {
        this.entries = this.fs.listDir();
    }
}
