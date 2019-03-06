import {DbEntity} from './db.entity';

export class Annotation implements DbEntity {
    private _id: string;
    private _bbox: any;
    private _mask: any;
    private _caption: any;

    deserialize(object: any): Annotation {
        return this;
    }

    serialize(): object {
        return {
            _id: this._id,
            cat: 'Annotation'
        };
    }
}
