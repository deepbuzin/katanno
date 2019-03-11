import { DbEntity } from './db.entity';
import { Annotation } from './annotation';

export class Entry implements DbEntity {
    private _id: string;
    private _filename: string;
    private _url: string;
    private _annotations: Array<Annotation>;
    private _datasetName: string;
    private _datasetId: string;

    constructor() {
    }

    static create(props): Entry {
        return new this().deserialize(props);
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get filename(): string {
        return this._filename;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get annotations(): Array<Annotation> {
        return this._annotations;
    }

    set annotations(value: Array<Annotation>) {
        this._annotations = value;
    }

    get datasetName(): string {
        return this._datasetName;
    }

    set datasetName(value: string) {
        this._datasetName = value;
    }

    get datasetId(): string {
        return this._datasetId;
    }

    set datasetId(value: string) {
        this._datasetId = value;
    }

    deserialize(object: any): Entry {
        this.id = object._id;
        this.filename = object.filename;
        this.url = object.url;
        this.annotations = object.annotations.map(a => new Annotation().deserialize(a));
        this.datasetName = object.datasetName;
        this.datasetId = object.datasetId;
        return this;
    }

    serialize(): any {
        const obj = {
            type: 'Entry',
            filename: this.filename,
            url: this.url,
            annotations: this.annotations.map(a => a.serialize()),
            datasetName: this.datasetName,
            datasetId: this.datasetId
        };
        if (this.id) obj['_id'] = this.id;
        return obj;
    }

}
