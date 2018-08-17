import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

import { SpreadsheetIDs } from './spreadsheetIDs';

@Injectable()
export class SpreadsheetDS {

  ssIDs: SpreadsheetIDs = new SpreadsheetIDs;
  lastUpdated = new Date();
  refreshHowOften = (36e5 * 6); // 6 hours

  dogs$: Observable<Array<any>>;
  cats$: Observable<Array<any>>;
  others$: Observable<Array<any>>;

  dogsLabel = 'Dogs';
  catsLabel = 'Cats';
  othersLabel = 'Other Animals';

  dogsUpdated = new EventEmitter<Array<any>>();
  catsUpdated = new EventEmitter<Array<any>>();
  othersUpdated = new EventEmitter<Array<any>>();

  constructor(public http: HttpClient) {

    // initial loads
    this.loadDogs('Dogs');
    this.loadCats('Cats');
    this.loadOthers('Others');
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
    this.loadOthers('Others');
    this.lastUpdated = new Date();
  }

  loadDogs(objName: string) {

    const animalName = 'Dog';
    let dogs: Array<any> = [];
    this.dogs$ = this.getHTTPData_SS(objName);
    this.dogs$.subscribe(next => {

      if (next != null) {
        // transform the JSON returned to make it more usable
        dogs = this.transformDogs(next);
        SpreadsheetDS.setLocal(dogs, this.ssIDs.getCacheName(objName));
        this.dogsLabel = this.buildLabel(dogs.length, animalName);
        this.dogsUpdated.emit(dogs);
      } else {
        this.dogsLabel = this.buildLabel(0, animalName);
      }

    });

  }

  transformDogs(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({
        Name: i.gsx$name.$t,
        Breed: i.gsx$breed.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t
      });
    }
    return tempArray;
  }

  loadCats(objName: string) {

    const animalName = 'Cat';
    let cats: Array<any> = [];
    this.cats$ = this.getHTTPData_SS(objName);
    this.cats$.subscribe(next => {

      if (next != null) {
        // transform the JSON returned to make it more usable
        cats = this.transformCats(next);
        SpreadsheetDS.setLocal(cats, this.ssIDs.getCacheName(objName));
        this.catsLabel = this.buildLabel(cats.length, animalName);
        this.catsUpdated.emit(cats);
      } else {
        this.catsLabel = this.buildLabel(0, animalName);
      }

    });

  }

  transformCats(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({
        Name: i.gsx$name.$t,
        Breed: i.gsx$breed.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t
      });
    }
    return tempArray;
  }

  loadOthers(objName: string) {

    const animalName = 'Other Animal';
    let others: Array<any> = [];
    this.others$ = this.getHTTPData_SS(objName);
    this.others$.subscribe(next => {

      if (next != null) {
        // transform the JSON returned to make it more usable
        others = this.transformOthers(next);

        SpreadsheetDS.setLocal(others, this.ssIDs.getCacheName(objName));
        this.othersLabel = this.buildLabel(others.length, animalName);
        this.othersUpdated.emit(others);
      } else{
        this.othersLabel = this.buildLabel(0, animalName);
      }

    });

  }

  transformOthers(dataReceived: Array<any>): Array<any> {

    const tempArray: Array<any> = [];
    for (const i of dataReceived) {

      tempArray.push({
        Name: i.gsx$name.$t,
        Type: i.gsx$type.$t,
        Birthdate: i.gsx$birthdate.$t,
        CurrentAge: i.gsx$currentage.$t
      });
    }
    return tempArray;
  }

  buildLabel(animalCount: number, animalName: string) {

    let label = '';

    switch (animalCount) {
      case 0: {
        label = 'No ' + animalName + 's';
        break;
      }
      case 1: {
        label = '1 ' + animalName;
        break;
      }
      default: {
        label = animalCount + ' ' + animalName + 's';
        break;
      }
    }

    return label;
  }

}
