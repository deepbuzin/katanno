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

    public insertOne(obj: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(obj, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    public insertMany(objs: Array<any>): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.db.insert(objs, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }

    public fetchOne(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find(query, (err, doc) => {
                if (err) reject(err);
                resolve(doc[0]);
            });
        });
    }

    public fetchMany(query: any): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.db.find(query, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }

    public updateOne(query: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update(query, update, { returnUpdatedDocs: true, multi: false }, (err, numAffected, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    public updateMany(query: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update(query, update, { returnUpdatedDocs: true, multi: true }, (err, numAffected, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }
}
