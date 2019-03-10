import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FsService} from '../../services/fs.service';
import {DbService} from '../../services/db.service';
import {Entry} from '../../entities/entry';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
    private fs: FsService;
    private db: DbService;

    private dataSetId: string;
    private imgId: string;

    private activeDS: Array<any>;
    private entries: Array<Entry> = [];

  constructor(private route: ActivatedRoute) {
      this.fs = FsService.instance;
      this.db = DbService.instance;
  }

    ngOnInit () {
        this.route.params.subscribe( params => {
            this.dataSetId = params['dataset'];
            this.imgId = params['img'];
            this.getActiveDS(this.dataSetId);
        }, error => {
                console.error(error);
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.dataSetId.currentValue) {
          this.getActiveDS(changes.dataSetId.currentValue);
      }
    }

    getActiveDS (id) {
      this.db.fetchOneById(id).then(response => {
          this.activeDS = response;
      });
      this.db.fetchMany({ _datasetId: id }).then(imgs => {
          this.sortEntries(imgs);
      });
    }

    sortEntries (imgs: Array<Entry>) {
      this.entries.push(imgs.find((e, i, a) => {
          return e.id === this.imgId;
      })
      );
    }
}
