import { DbEntity } from './db.entity';
import { Annotation } from './annotation';

export class Entry implements DbEntity {
    private _id: string;
    private _filename: string;
    private _annotations: Array<Annotation>;


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get filename(): string {
        return this._filename;
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

    deserialize(object: any): Entry {
        this.id = object._id;
        this.filename = object.filename;
        this.annotations = object.annotations.map(a => new Annotation().deserialize(a));
        return this;
    }

    serialize(): object {
        return {
            _id: this.id,
            cat: 'Entry',
            filename: this.filename,
            annotations: this.annotations.map(a => a.serialize())
        };
    }

}
