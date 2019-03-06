import { DbEntity } from './db.entity';

export class Keypoint implements DbEntity {
    private _name: string;
    private _x: number;
    private _y: number;
    private _visible: boolean;

    constructor(name: string) {
        this._name = name;
    }

    deserialize(object: any): DbEntity {
        return undefined;
    }

    serialize(): any {
    }
}
