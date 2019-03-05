import { Injectable } from '@angular/core';
import { join } from 'path';
const Datastore = require('nedb');

@Injectable()
export class DbService {
    private db;
    private static _instance: DbService;

    private constructor() {
        this.db = new Datastore({filename: join(process.cwd(), 'datasets'), autoload: true});
    }

    public static get instance(): DbService {
        return this._instance || (this._instance = new this());
    }

    public insert(obj): void {
        this.db.insert(obj, (err, newDoc) => {
            console.log(err, newDoc);
        });
    }

    public fetchByCategory(cat): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.db.find({category: cat}, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }
}
