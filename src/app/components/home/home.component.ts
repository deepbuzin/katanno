import {Component, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {Dataset} from '../../entities/dataset';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private activeDataset: Dataset;
    private noEntries = false;
    private datasets = [
        {
            _id: 'kek',
            name: 'I eat ass'
        },
        {
            _id: 'ahahhah',
            name: 'I love kpop'
        },
        {
            _id: 'oh_hi_mark',
            name: 'I`m in serious trouble please help me'
        },
        {
            _id: 'goodbyenow',
            name: 'Thats`s not funny anymore'
        }
    ];

    constructor(private db: DbService) {
    }

    logDS(ds) {
        this.activeDataset = ds;
        console.log(this.activeDataset);
    }

    ngOnInit() {
        // this.db.dropDb();
    }

}
