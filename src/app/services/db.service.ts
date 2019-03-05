import { Injectable } from '@angular/core';
import { join } from 'path';
const Datastore = require('nedb');

@Injectable()
export class DbService {
    private db;

    constructor() {
        this.db = new Datastore({filename: join(process.cwd(), '_db'), autoload: true});
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

    public fetchByCategory(cat): Array<Object> {
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
