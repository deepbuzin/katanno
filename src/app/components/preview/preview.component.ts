import { Component, OnInit } from '@angular/core';
import {FSService} from '../../services/fs.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
    private fs: FSService;
  constructor() {
      this.fs = new FSService();
  }

  ngOnInit() {
      this.fs.openDialog();
  }

}
