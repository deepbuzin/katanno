import {Injectable} from '@angular/core';
import {readdir, readdirSync, stat} from 'fs';
import {resolve} from 'path';
import {shell} from 'electron';
const { dialog } = require('electron').remote;

@Injectable()
export class FSService {
    private currentPath: string = process.cwd();

    constructor() {
    }

    public openDialog(): void {
        console.log('DIALOG', dialog);
        console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
    }

    public listDir(): Array<string> {
        return readdirSync(this.currentPath);
    }
}
