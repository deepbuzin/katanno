import {DbEntity} from './db.entity';

export class Annotation implements DbEntity {
    private _id: string;
    private _bbox: any;
    private _mask: any;
    private _caption: any;

    deserialize<Annotation>(object: any): Annotation {
        return undefined;
    }

    serialize(): object {
        return undefined;
    }
}
