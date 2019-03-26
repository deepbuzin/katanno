import { DbEntity } from './db.entity';

export class Cat implements DbEntity {
    private _id: string;
    private _name: string;
    private _hasBbox: boolean;
    private _hasKeypoints: boolean;
    private _keypointNames: Array<string>;
    private _hasMask: boolean;
    private _hasCaption: boolean;

    constructor() {
    }

    static create(props): Cat {
        return new this().deserialize(props);
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get hasBbox(): boolean {
        return this._hasBbox;
    }

    set hasBbox(value: boolean) {
        this._hasBbox = value;
    }

    get hasKeypoints(): boolean {
        return this._hasKeypoints;
    }

    set hasKeypoints(value: boolean) {
        this._hasKeypoints = value;
    }

    get keypointNames(): Array<string> {
        return this._keypointNames;
    }

    set keypointNames(value: Array<string>) {
        this._keypointNames = value;
    }

    get hasMask(): boolean {
        return this._hasMask;
    }

    set hasMask(value: boolean) {
        this._hasMask = value;
    }

    get hasCaption(): boolean {
        return this._hasCaption;
    }

    set hasCaption(value: boolean) {
        this._hasCaption = value;
    }

    deserialize(object: any): Cat {
        this.id = object._id;
        this.name = object.name;
        this.hasBbox = object.hasBbox;
        this.hasKeypoints = object.hasKeypoints;
        this.keypointNames = object.keypointNames;
        this.hasMask = object.hasMask;
        this.hasCaption = object.hasCaption;
        return this;
    }

    serialize(): any {
        const obj = {
            type: 'Cat',
            name: this.name,
            hasBbox: this.hasBbox,
            hasKeypoints: this.hasKeypoints,
            keypointNames: this.keypointNames,
            hasMask: this.hasMask,
            hasCaption: this.hasCaption
        };
        if (this.id) obj['_id'] = this.id;
        return obj;
    }
}
