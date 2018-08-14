import { Component, OnInit } from '@angular/core';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

@Component({
  selector: 'dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  dogs: Array<any>;
  objName = 'Dogs';

  constructor(private sds: SpreadsheetDS) {

    this.sds.dogsUpdated.subscribe(
      (newData: any) => {
        this.dogs = newData;
        // console.log(this.objName + ' updated');
      }
    );
  }

  ngOnInit() {
    this.sds.dogsUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
  }

  refreshDogs() {
    this.sds.loadDogs(this.objName);
  }

}
