import { Component, OnInit } from '@angular/core';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

@Component({
  selector: 'cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cats: Array<any>;
  objName = 'Cats';

  constructor(private sds: SpreadsheetDS) {

    this.sds.catsUpdated.subscribe(
      (newData: any) => {
        this.cats = newData;
        // console.log(this.objName + ' updated');
      }
    );
  }

  ngOnInit() {
    this.sds.catsUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
  }

  refreshCats() {
    this.sds.loadCats(this.objName);
  }

}
