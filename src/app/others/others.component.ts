import { Component, OnInit } from '@angular/core';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

@Component({
  selector: 'others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  others: Array<any>;
  objName = 'Others';

  constructor(public sds: SpreadsheetDS) {

    this.sds.othersUpdated.subscribe(
      (newData: any) => {
        this.others = newData;
        // console.log(this.objName + ' updated');
      }
    );
  }

  ngOnInit() {
    this.sds.othersUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
  }

  refreshOthers() {
    this.sds.loadOthers(this.objName);
  }

}
