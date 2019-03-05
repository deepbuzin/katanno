import { Component, OnInit } from '@angular/core';
import { FsService} from '../../services/fs.service';
import { DbService } from '../../services/db.service';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
    private fs: FsService;
    private db: DbService;

    constructor() {
        this.fs = new FsService();
        this.db = new DbService();
    }

    ngOnInit() {
    }

    onClickNew() {
        const path = this.fs.selectDirDialog();
        this.db.insert({category: 'folder', path: path})
    }
}
