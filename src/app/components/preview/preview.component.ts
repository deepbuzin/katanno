import { Component, OnInit } from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
    private fs: FsService;
    private db: DbService;
  constructor() {
      this.fs = new FsService();
      this.db = new DbService();
  }

  ngOnInit() {
      // this.fs.openDialog();
      // this.db.useDb();
  }

}
