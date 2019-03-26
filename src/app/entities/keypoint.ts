import { DbEntity } from './db.entity';

export class Keypoint implements DbEntity {
    private _id: string;
    private _name: string;
    private _x: number;
    private _y: number;
    private _visible: boolean;

    constructor() {
    }

    static create(props): Keypoint {
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

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
    }

    deserialize(object: any): Keypoint {
        this.id = object._id;
        this.name = object.name;
        this.x = object.x;
        this.y = object.y;
        this.visible = object.visible;
        return this;
    }

    serialize(): any {
        const obj = {
            type: 'Keypoint',
            name: this.name,
            x: this.x,
            y: this.y,
            visible: this.visible,
        };
        if (this.id) obj['_id'] = this.id;
        return obj;
    }
}
