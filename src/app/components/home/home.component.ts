import { Component, OnInit } from '@angular/core';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DbService) { }

  ngOnInit() {
      // this.db.dropDb();
  }

}
