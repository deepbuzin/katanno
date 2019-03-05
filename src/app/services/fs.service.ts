import {Injectable} from '@angular/core';
import {readdir, readdirSync, stat} from 'fs';
import {resolve} from 'path';
import {shell} from 'electron';
const { dialog } = require('electron').remote;

@Injectable()
export class FsService {
    private currentPath: string = process.cwd();

    constructor() {
    }

    public selectDirDialog(): string {
        return dialog.showOpenDialog({ properties: ['openDirectory'] })[0];
    }

    public listDir(): Array<string> {
        return readdirSync(this.currentPath);
    }
}
