import {Entry} from '../entities/entry';
import {DbService} from '../services/db.service';
import {Injectable} from '@angular/core';

@Injectable()
export class EntryRepo {
    public constructor(private db: DbService) {
    }
}
