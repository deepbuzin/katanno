import { Injectable } from '@angular/core';
import { join } from 'path';
const Datastore = require('nedb');

@Injectable()
export class DbService {
    private db;
    private static instance: DbService = new DbService();

    private constructor() {
        this.db = new Datastore({filename: join(process.cwd(), 'datasets')});
        this.db.loadDatabase(err => console.log(err));
    }

    public static getInstance(): DbService {
        return this.instance || (this.instance = new this());
    }

    public useDb(): void {
        this.db.insert({kek: 'pek'}, (err, newDoc) => {
            console.log(err, newDoc);
        });
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

    public fetchByCategoryStub(cat): Array<Object> {
        // return this.db.find({category: cat})
        // Mock V
        return [
            {
                category: cat,
                path: 'C:\\',
                name: 'Porn',
                id: 'id1234'
            },
            {
                category: cat,
                path: 'C:\\porn',
                name: 'Not porn',
                id: 'id1235'
            }
        ];
    }
}
