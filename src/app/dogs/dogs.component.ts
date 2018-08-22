import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';
import {TheCats} from '../cats/cats.component';

export interface TheDogs {
  Name: string;
  Breed: string;
  Birthdate: Date;
  CurrentAge: number;
}
@Component({
  selector: 'dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  dogs: MatTableDataSource<TheDogs>;
  objName = 'Dogs';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // the column order
  displayedColumns: string[] = ['Name', 'Breed', 'Birthdate', 'CurrentAge'];

  constructor(public sds: SpreadsheetDS) {

    this.sds.dogsUpdated.subscribe(
      (newData: any) => {
        this.dogs = new MatTableDataSource(newData);
        this.dogs.paginator = this.paginator;
        this.dogs.sort = this.sort;

        this.dogs.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Birthdate': return new Date(item.Birthdate);
            default: return item[property];
          }
        };
      }
    );
  }

  ngOnInit() {
    this.sds.dogsUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
    this.dogs.paginator = this.paginator;
  }

  refreshDogs() {
    this.sds.loadDogs(this.objName);
  }

  applyFilter(filterValue: string) {
    this.dogs.filter = filterValue.trim().toLowerCase();

    if (this.dogs.paginator) {
      this.dogs.paginator.firstPage();
    }
  }

}
