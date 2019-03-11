import {Entry} from '../entities/entry';
import {DbService} from '../services/db.service';
import {Injectable} from '@angular/core';

@Injectable()
export class EntryRepo {
    public constructor(private db: DbService) {
    }

    public insertMany(entries: Array<Entry>): Promise<Array<Entry>> {
        return new Promise<Array<Entry>>(resolve => {
            this.db.insertMany(entries.map(e => e.serialize()))
                .then(res => resolve(res.map(r => Entry.create(r))));
        });
    }

    public fetchOneById(id: string): Promise<Entry> {
        return new Promise<Entry>(resolve => {
            this.db.fetchOne({ type: 'Entry', _id: id })
                .then(res => resolve(Entry.create(res)))
        });
    }

    public fetchAllByDatasetId(datasetId: string): Promise<Array<Entry>> {
        return new Promise<Array<Entry>>(resolve => {
            this.db.fetchMany({ type: 'Entry', datasetId: datasetId })
                .then(res => resolve(res.map(r => Entry.create(r))));
        });
    }
}
