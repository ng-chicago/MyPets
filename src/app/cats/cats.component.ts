import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { SpreadsheetDS } from '../data/spreadsheet-data.service';

export interface TheCats {
  Name: string;
  Breed: string;
  Birthdate: Date;
  CurrentAge: number;
}

@Component({
  selector: 'cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cats: MatTableDataSource<TheCats>;
  objName = 'Cats';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // the column order
  displayedColumns: string[] = ['Name', 'Breed', 'Birthdate', 'CurrentAge'];

  constructor(public sds: SpreadsheetDS) {

    this.sds.catsUpdated.subscribe(
      (newData: any) => {
        this.cats = new MatTableDataSource(newData);
        this.cats.paginator = this.paginator;
        this.cats.sort = this.sort;

        this.cats.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Birthdate': return new Date(item.Birthdate);
            default: return item[property];
          }
        };
      }
    );
  }

  ngOnInit() {
    this.sds.catsUpdated.emit(
      // use the local storage if there until HTTP call retrieves something
      JSON.parse(localStorage[this.sds.ssIDs.getCacheName(this.objName)] || '[]')
    );
    this.cats.paginator = this.paginator;
  }

  refreshCats() {
    this.sds.loadCats(this.objName);
  }

  applyFilter(filterValue: string) {
    this.cats.filter = filterValue.trim().toLowerCase();

    if (this.cats.paginator) {
      this.cats.paginator.firstPage();
    }
  }

}
