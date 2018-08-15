import { Component, OnInit } from '@angular/core';
import { SpreadsheetDS } from '../../data/spreadsheet-data.service';

import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [
    SharedModule
  ]
})
export class HomeComponent implements OnInit {

  constructor(public sds: SpreadsheetDS) {
  }

  ngOnInit() {
    // this.sds.homeUpdated.emit(
    //   JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    // );
  }

  refreshEverything() {
    this.sds.refreshAll();
    // this.cds.loadDates(this.cds.whatCalendar, this.cds.howManyRecords);
  }

}
