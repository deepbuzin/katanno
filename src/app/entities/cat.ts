import { DbEntity } from './db.entity';

export class Cat implements DbEntity {
    private _name: string;
    private _hasBbox: boolean;
    private _hasKeypoints: boolean;
    private _keypointNames: Array<string>;
    private _hasMask: boolean;
    private _hasCaption: boolean;


}
