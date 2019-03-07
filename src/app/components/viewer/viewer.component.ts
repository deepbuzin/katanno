import { Component, OnInit } from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';
import { Dataset } from '../../entities/dataset';
import { Entry } from '../../entities/entry';

const path = require('path');

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
    private fs: FsService;
    private db: DbService;
    public datasets: Array<Dataset>;
    public entries: Array<Entry>;
    private noEntries = false;

    constructor() {
        this.fs = FsService.instance;
        this.db = DbService.instance;
        this.datasets = [];
    }

    ngOnInit() {
        this.fetchDatasets();
    }

    onClickNew() {
        const dir = this.fs.selectDirDialog();
        const datasetName = path.basename(dir);

        this.db.insertOne(Dataset.create({
            name: datasetName,
            path: dir,
            description: 'sample',
            // entryIds: e.map(entry => entry['_id']),
            entryIds: [],
        }).serialize()).then(ds => {
            this.datasets.push(new Dataset().deserialize(ds));
            const entries = this.fs.listDir(dir).map(filename => Entry.create({
                filename: filename,
                annotations: [],
                datasetName: datasetName,
                datasetId: ds['_id']
            }));

            this.db.insertMany(entries).then(es => {
                this.db.updateFieldsById(ds['_id'], { entryIds: es.map(e => e['_id']) })
            });
        });
    }

    async fetchDatasets(): Promise<void> {
        const datasets = this.db.fetchAllByType('Dataset');
        this.datasets = await datasets;
        this.noEntries = !this.datasets;
    }

    logActiveDS (event) {
        console.warn('received dataset id', event);
    }
}
