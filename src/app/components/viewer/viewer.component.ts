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
    public directories;

    constructor() {
        this.fs = FsService.instance;
        this.db = DbService.instance;
    }

    ngOnInit() {
    }

    onClickNew() {
        const path = this.fs.selectDirDialog();
        this.db.insert({category: 'folder', path: path});
        this.getDatasets();
        console.log(this.directories);
    }

    getDatasets () {
        this.directories = this.db.fetchByCategory('folder');
    }

    logActiveDS (event) {
        console.warn('received dataset id', event);
    }
}
