import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { FsService } from '../../services/fs.service';
import { DbService } from '../../services/db.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {
    private fs: FsService;
    private db: DbService;


    private entries;
    private activeDataSet;

    @Input()
    dataSetId: string;

  constructor(private sanitizer: DomSanitizer) {
      this.fs = FsService.instance;
      this.db = DbService.instance;
  }

  ngOnChanges(changes) {
      if (changes.dataSetId.currentValue) {
          this.getDSById(changes.dataSetId.currentValue);
      }
  }

  getDSById(id) {
      this.db.fetchOneById(id).then(data => {
          this.activeDataSet = data;
          this.db.fetchMany({ _datasetId: data._id }).then(imgs => {
              this.entries = imgs;
          });
      });
  }

  sanitize(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
  }

}
