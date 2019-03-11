import {Dataset} from '../entities/dataset';
import {DbService} from '../services/db.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DatasetRepo {
    public constructor(private db: DbService) {
    }

    public fetchOneById(id: string): Promise<Dataset> {
        return new Promise<Dataset>(resolve => {
            this.db.fetchOne({ _id: id, type: 'Dataset' })
                .then(res => resolve(Dataset.create(res)));
        });
    }

    public fetchAll(): Promise<Array<Dataset>> {
        return new Promise<Array<Dataset>>(resolve => {
            this.db.fetchMany({ type: 'Dataset' })
                .then(res => resolve(res.map(r => Dataset.create(r))));
        });
    }

    public insertOne(ds: Dataset): Promise<Dataset> {
        return new Promise<Dataset>( resolve => {
            this.db.insertOne(ds.serialize())
                .then(res => resolve(Dataset.create(res)));
        });
    }

    public updateEntryIdsById(id: string, entryIds: Array<string>): Promise<Dataset> {
        return new Promise<Dataset>(resolve => {
            this.db.updateOne({ type: 'Dataset', _id: id }, { $set: { entryIds: entryIds } })
                .then(res => resolve(Dataset.create(res)));
        });
    }
}
