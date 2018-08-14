import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

import { SpreadsheetIDs } from './spreadsheetIDs';

@Injectable()
export class SpreadsheetDS  {

  ssIDs: SpreadsheetIDs = new SpreadsheetIDs;
  lastUpdated = new Date();
  refreshHowOften = (36e5 * 6); // 6 hours

  dogs$: Observable<Array<any>>;
  cats$: Observable<Array<any>>;
  allOthers$: Observable<Array<any>>;

  dogsUpdated = new EventEmitter<Array<any>>();
  catsUpdated = new EventEmitter<Array<any>>();
  allOthersUpdated = new EventEmitter<Array<any>>();

  constructor(public http: HttpClient) {

    // initial loads
    this.loadDogs('Dogs');
    this.loadCats('Cats');
    this.loadAllOthers('AllOthers');
    // setInterval( () => { this.refreshStaleData(); }, this.refreshHowOften);
  }
  public static setLocal(whatData: any, cacheName: string) {
    // writes data to local storage
    localStorage[cacheName] = JSON.stringify(whatData);
  }
  refreshStaleData() {
    this.refreshAll();
  }

  // google sheets
  getHTTPData_SS(whatTab: string): Observable<Array<any>> {
    // console.log('Getting data from the ' + whatTab + ' spreadsheet tab');
    return this.http.get<any>(this.ssIDs.getTabURL(whatTab))
      .pipe(map(obj => obj.feed.entry));
  }

  getHTTPData_Tabs(): Observable<Array<any>> {
    // console.log('Getting all tabs in the spreadsheet');
    return this.http.get<any>(this.ssIDs.getAllTabsURL())
      .pipe(map(obj => obj.feed.entry));
  }

  refreshAll() {
    this.loadDogs('Dogs');
    this.loadCats('Cats');
    this.loadAllOthers('AllOthers');
    this.lastUpdated = new Date();
  }

  loadDogs(objName: string) {

    let dogs: Array<any> = [];
    this.dogs$ = this.getHTTPData_SS(objName);
    this.dogs$.subscribe(next => {

      // transform the JSON returned to make it more usable
      dogs = this.transformDogs(next);

      SpreadsheetDS.setLocal(dogs, this.ssIDs.getCacheName(objName));
        this.dogsUpdated.emit(dogs);

    });

  }
  transformDogs(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({Name: i.gsx$name.$t,
        Breed: i.gsx$breed.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t});
    }
    return tempArray;
  }

  loadCats(objName: string) {

    let cats: Array<any> = [];
    this.cats$ = this.getHTTPData_SS(objName);
    this.cats$.subscribe(next => {

      // transform the JSON returned to make it more usable
      cats = this.transformCats(next);

      SpreadsheetDS.setLocal(cats, this.ssIDs.getCacheName(objName));
      this.catsUpdated.emit(cats);

    });

  }
  transformCats(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({Name: i.gsx$name.$t,
        Breed: i.gsx$breed.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t});
    }
    return tempArray;
  }

  loadAllOthers(objName: string) {

    let allOthers: Array<any> = [];
    this.allOthers$ = this.getHTTPData_SS(objName);
    this.allOthers$.subscribe(next => {

      // transform the JSON returned to make it more usable
      allOthers = this.transformAllOthers(next);

      SpreadsheetDS.setLocal(allOthers, this.ssIDs.getCacheName(objName));
      this.allOthersUpdated.emit(allOthers);

    });

  }
  transformAllOthers(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({Name: i.gsx$name.$t,
        Type: i.gsx$type.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t});
    }
    return tempArray;
  }

}
