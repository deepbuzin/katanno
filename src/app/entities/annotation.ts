import { DbEntity } from './db.entity';
import { Cat } from './cat';
import { Keypoint } from './keypoint';

export class Annotation implements DbEntity {
    private _id: string;
    private _cat: Cat;
    private _bbox: any;
    private _mask: any;
    private _keypoints: Array<Keypoint>;
    private _caption: any;

    deserialize(object: any): Annotation {
        return this;
    }

    serialize(): object {
        return {
            _id: this._id,
            type: 'Annotation'
        };
    }
}
