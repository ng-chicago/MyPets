import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { SpreadsheetDS } from '../../data/spreadsheet-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [
    SharedModule
  ]
})
export class HomeComponent {

  constructor(public sds: SpreadsheetDS) {}

  refreshAll() {
    this.sds.refreshAll();
  }

}
