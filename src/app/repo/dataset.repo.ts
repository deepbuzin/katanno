import {Dataset} from '../entities/dataset';
import {DbService} from '../services/db.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DatasetRepo {
    public constructor(private db: DbService) {
    }
}
