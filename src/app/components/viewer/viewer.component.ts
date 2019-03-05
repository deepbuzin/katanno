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
        // TODO
        // Юзать здесь либу для сплиттинга
        const path = this.fs.selectDirDialog();
        const patharr = path.split('\\');
        const name = patharr[patharr.length - 1];
        this.db.insert({category: 'folder', path: path, name: name});
        this.getDatasets();
        console.log(this.directories);
    }

    async getDatasets () {
        this.directories = await this.db.fetchByCategory('folder');
    }

    logActiveDS (event) {
        console.warn('received dataset id', event);
    }
}
