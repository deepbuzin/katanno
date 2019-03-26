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

    constructor() {
    }

    static create(props): Annotation {
        return new this().deserialize(props);
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get cat(): Cat {
        return this._cat;
    }

    set cat(value: Cat) {
        this._cat = value;
    }

    get bbox(): any {
        return this._bbox;
    }

    set bbox(value: any) {
        this._bbox = value;
    }

    get mask(): any {
        return this._mask;
    }

    set mask(value: any) {
        this._mask = value;
    }

    get keypoints(): Array<Keypoint> {
        return this._keypoints;
    }

    set keypoints(value: Array<Keypoint>) {
        this._keypoints = value;
    }

    get caption(): any {
        return this._caption;
    }

    set caption(value: any) {
        this._caption = value;
    }

    deserialize(object: any): Annotation {
        this.id = object._id;
        this.cat = Cat.create(object.cat);
        this.bbox = object.bbox;
        this.mask = object.mask;
        this.keypoints = object.keypoints.map(kp => new Keypoint().deserialize(kp));
        this.caption = object.caption;
        return this;
    }

    serialize(): object {
        const obj = {
            type: 'Annotation',
            cat: this.cat.serialize(),
            bbox: this.bbox,
            mask: this.mask,
            keypoints: this.keypoints.map(kp => kp.serialize()),
            caption: this.caption
        };
        if (this.id) obj['_id'] = this.id;
        return obj;
    }
}
