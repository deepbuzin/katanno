import {DbEntity} from './db.entity';

export class Dataset implements DbEntity {
    private _id: string;
    private _name: string;
    private _path: string;
    private _description: string;
    private _entryIds: Array<string>;

    constructor() {
    }

    static create(props): Dataset {
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

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get entryIds(): Array<string> {
        return this._entryIds;
    }

    set entryIds(value: Array<string>) {
        this._entryIds = value;
    }

    deserialize(object: any): Dataset {
        this.id = object._id;
        this.name = object.name;
        this.path = object.path;
        this.description = object.description;
        this.entryIds = object.entryIds;
        return this;
    }

    serialize(): any {
        const obj = {
            type: 'Dataset',
            name: this.name,
            path: this.path,
            description: this.description,
            entryIds: this.entryIds
        };
        if (this.id) obj['_id'] = this.id;
        return obj;
    }

}

