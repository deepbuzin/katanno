import { Component, OnInit } from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';
import { Dataset } from '../../entities/dataset';
import { Entry } from '../../entities/entry';

const path = require('path');

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
    public datasets: Array<Dataset>;
    public entries: Array<Entry>;
    private noEntries = false;
    private activeDSid: string;

    constructor(private db: DbService, private fs: FsService) {
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
            entryIds: [],
        }).serialize()).then(ds => {
            const entries = this.fs.listDir(dir).map(filename => Entry.create({
                filename: filename,
                url: path.join(dir, filename),
                annotations: [],
                datasetName: datasetName,
                datasetId: ds['_id']
            }).serialize());

            this.db.insertMany(entries).then(es => {
                this.db.updateOne({_id: ds['_id']}, { $set: { entryIds: es.map(e => e['_id']) }});
            });
        });

        this.fetchDatasets();
    }

    async fetchDatasets(): Promise<void> {
        const datasets = await this.db.fetchMany({type: 'Dataset'});
        this.datasets = datasets;
        this.noEntries = !this.datasets;
    }

    previewDS (event) {
        this.activeDSid = event;
    }
}
