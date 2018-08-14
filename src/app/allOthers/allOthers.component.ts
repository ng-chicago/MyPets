import { Component, OnInit } from '@angular/core';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

@Component({
  selector: 'allOthers',
  templateUrl: './allOthers.component.html',
  styleUrls: ['./allOthers.component.css']
})
export class AllOthersComponent implements OnInit {

  allOthers: Array<any>;
  objName = 'AllOthers';

  constructor(private sds: SpreadsheetDS) {

    this.sds.allOthersUpdated.subscribe(
      (newData: any) => {
        this.allOthers = newData;
        // console.log(this.objName + ' updated');
      }
    );
  }

  ngOnInit() {
    this.sds.allOthersUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
  }

  refreshAllOthers() {
    this.sds.loadAllOthers(this.objName);
  }

}
