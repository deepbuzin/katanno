import { Component, OnInit } from '@angular/core';
import { FsService } from '../../services/fs.service';
import { Dataset } from '../../entities/dataset';
import { Entry } from '../../entities/entry';
import { DatasetRepo } from '../../repo/dataset.repo';
import {EntryRepo} from '../../repo/entry.repo';

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

    constructor(private dsRepo: DatasetRepo, private entryRepo: EntryRepo, private fs: FsService) {
        this.datasets = [];
    }

    ngOnInit() {
        this.fetchDatasets();
    }

    onClickNew() {
        const dir = this.fs.selectDirDialog();
        const datasetName = path.basename(dir);

        this.dsRepo.insertOne(Dataset.create({
            name: datasetName,
            path: dir,
            description: 'sample',
            entryIds: [],
            cats: []
        })).then(ds => {
            const entries = this.fs.listDir(dir).map(filename => Entry.create({
                filename: filename,
                url: path.join(dir, filename),
                annotations: [],
                datasetName: datasetName,
                datasetId: ds['_id']
            }));
            this.entryRepo.insertMany(entries).then(es => {
                this.dsRepo.updateEntryIdsById(ds.id, es.map(e => e.id));
            });
        });

        this.fetchDatasets();
    }

    async fetchDatasets(): Promise<void> {
        const datasets = await this.dsRepo.fetchAll();
        this.datasets = datasets;
        this.noEntries = !this.datasets;
    }

    previewDS (event) {
        this.activeDSid = event;
    }
}
