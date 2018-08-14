export class SpreadsheetIDs {

  spreadsheetID = '1bPW98SzQ5SRsincyVGdP3ctM8ey3oSpncnyo9ASFUDM';

  dataObjects =  [
    {objName: 'Dogs', tabID: 'omyavzt', cache: 'dogsCache', useYN: 'Y'},
    {objName: 'Cats', tabID: 'o9ws5hl', cache: 'catsCache', useYN: 'Y'},
    {objName: 'AllOthers', tabID: 'od6', cache: 'allOthersCache', useYN: 'Y'}
  ];
  tabURLStart = 'https://spreadsheets.google.com/feeds/list/';
  allTabsURLStart = 'https://spreadsheets.google.com/feeds/worksheets/';
  urlEnd = '/public/full?alt=json';

  getTabURL(whichTab: string ): string {
    return this.tabURLStart + this.spreadsheetID + '/' +
      this.dataObjects.find(myObj => myObj.objName === whichTab).tabID +
      this.urlEnd;
  }
  getCacheName(whichTab: string ): string {
    return this.dataObjects.find(myObj => myObj.objName === whichTab).cache;
  }
  getAllTabsURL(): string {
    return this.allTabsURLStart + this.spreadsheetID + this.urlEnd;
  }
}
