import {DbEntity} from './db.entity';

export class Entry implements DbEntity {
    private _id: string;
    private _filename: string;

    deserialize<Entry>(object: any): Entry {
        return undefined;
    }

    serialize(): object {
        return undefined;
    }

}
