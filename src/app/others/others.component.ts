import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

export interface TheOthers {
  Name: string;
  Type: string;
  Birthdate: Date;
  CurrentAge: number;
}

@Component({
  selector: 'others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  others: MatTableDataSource<TheOthers>;
  objName = 'Others';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // the column order
  displayedColumns: string[] = ['Name', 'Type', 'Birthdate', 'CurrentAge'];

  constructor(public sds: SpreadsheetDS) {

    this.sds.othersUpdated.subscribe(
      (newData: any) => {
        this.others = new MatTableDataSource(newData);
        this.others.paginator = this.paginator;
        this.others.sort = this.sort;

        this.others.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Birthdate': return new Date(item.Birthdate);
            default: return item[property];
          }
        };
      }
    );
  }

  ngOnInit() {
    this.sds.othersUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
    this.others.paginator = this.paginator;
  }

  refreshOthers() {
    this.sds.loadOthers(this.objName);
  }

  applyFilter(filterValue: string) {
    this.others.filter = filterValue.trim().toLowerCase();

    if (this.others.paginator) {
      this.others.paginator.firstPage();
    }
  }

}
