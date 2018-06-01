import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Collection } from '../../../../models/collections.model';
import { Person } from '../../../../models/fpcare.models';
import { Site, SiteAccess } from '../../../../models/sites.model';
import { MillerColumn, MillerColumnConfig, MillerItem } from './miller-columns.interface';

const TIMING = "500ms";
@Component({
  selector: 'fpcare-miller-columns',
  templateUrl: './miller-columns.component.html',
  styleUrls: ['./miller-columns.component.scss'],
  // Necessary so styles also apply to Miller-Item-Checkbox
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('loadInOut', [
      transition('void => *', [
        animate(TIMING, keyframes([
          style({opacity: 0, transform: 'translateX(-100%) translateZ(-500px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      // TODO: Disabling the :leave animation for now as it was itnerfering with the :enter one.
      // transition('* => void', [
      //   animate(TIMING, keyframes([
      //     style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
      //     // style({opacity: 1, transform: 'translateX(5px)', offset: 0.5}),
      //     style({opacity: 1, transform: 'translateX(15px)', offset: 0.6}),
      //     style({opacity: 0, transform: 'translateX(-100%) translateZ(-500px)',  offset: 1.0})
      //   ]))
      // ])
    ]),
    // Alternate "flip" animation that matches Farzad's designs more.
    trigger('flipInOut', [
      transition('void => *', [
        animate(TIMING, keyframes([
          style({opacity: 0, transform: 'rotateX(-90deg)', offset: 0}),
          style({opacity: 1, transform: 'rotateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(TIMING, keyframes([
          style({opacity: 1, transform: 'rotateX(0)',     offset: 0}),
          style({opacity: 0, transform: 'rotateX(-90deg)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class MillerColumnsComponent implements OnInit {

  @Input() config: MillerColumnConfig;

  // TODO: Changing columnOrder should re-arrange data
  // @Input() columnTitles: string[];
  private columnOrder: string[]  = ['Collections', 'Sites', 'People'];

  // private _columns: MillerItem[][];
  //TODO: Make interface!
  // private _columns: any;
  private _columns:  MillerColumn[];
  public changesMade: boolean = false;
  private MINIMUM_COLUMNS = 3;
  public declarationCheck: boolean = false;
  public saveSuccess: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    // Modify column ordering based on config
    if (this.config.options &&
        this.config.options.primaryColumn &&
        this.config.options.primaryColumn.toLowerCase() === "people"){
          this.columnOrder = ['People', 'Collections', 'Sites'];
    }

    // Setup first column
    this._columns = [
      {
        title: this.columnOrder[0],
        items: this.config.data[this.columnOrder[0].toLowerCase()],
        index: 0,
      }
    ]


    // Check if there's a pre-selected id in the config
    if (this.config.options && this.config.options.preselectObjectId){
      const preselectObjectId = this.config.options.preselectObjectId;
      // Selected item will be in first column, regardless of primaryColumn
      const preselectItem = this._columns[0].items
        .find(item => item.objectId === preselectObjectId)

      if (!preselectItem) {
        console.error("MillerColumnsComponent config.options.preselectObjectId refers to an object which does not exist! Removed objectId from url.");
        this.router.navigate(['/verifier/enrollment/']);
        return;
      }

      this.openColumnFromItem(preselectItem);
      // Open second column too. Currently just opens the top item, no advanced logic. Potentially could open an item it does not have SA's with, but should be rare.
      this.openColumnFromItem(this._columns[1].items[0])
    }

  }


  // get columns() : MillerItem[][] {
  get columns() : any {
    return this._columns;
  }

  public get IS_PEOPLE_TABLE(): boolean {
   return !!(this.config.options &&
      this.config.options.primaryColumn &&
      this.config.options.primaryColumn.toLowerCase() === "people");
  }


  filterColumn(phrase, colIndex){
    this._columns[colIndex]['items'] = this._columns[colIndex]['items']
    .map(x => {
      // Remove from search results without modifying array order.
      x.hidden = x.name.toLowerCase().indexOf(phrase.toLowerCase()) === -1;
      return x;
    })
  }


  onItemClick(item: MillerItem){
    if (item.open) return; //It's already open, don't re-create it.
    this.openColumnFromItem(item);
  }

  openColumnFromItem(item: MillerItem){
    let colIndex = this.findColumnIndexFromItem(item);
    // Close other items in the same column
    this._columns[colIndex]['items'].filter(x => x !== item)
    .map(x => x.open = false);
    // Close open items in child columns
    this.cleanUpChildColumns(colIndex);
    // Open the selection
    item.open = true;
    this.addColumnFromItem(item, colIndex);
  }

  // TODO: Column interface/type
  onClickColTitle(column){
    this.closeColumn(column);
  }

  onCheck(pending: SiteAccess[]){
    this.saveSuccess = false;
    this.changesMade = pending.length >= 1;
  }

  //TODO: Column interface + move fn location
  private closeColumn(column){
    this.closeColumnByIndex(column.index);
  }

  //TODO: Column interface + move fn location
  private closeColumnByIndex(index){
    this.cleanUpChildColumns(index);
    this._columns = [... this._columns.slice(0, index)]
  }


  /**
   * Creates (and destroys) columns as necessary based on item user has clicked.
   */
  private addColumnFromItem(item: MillerItem, colIndex: number){
    const newIndex = colIndex + 1;
    const newItems = this.findItemsAtColIndex(item, newIndex);

    if (newItems.length){ //Create column
      const newCol: MillerColumn = {
        title: this.columnOrder[newIndex],
        items: newItems,
        index: newIndex,
      }
      this._columns = [... this._columns.slice(0, newIndex), newCol]
    }
    else {
      this.closeColumnByIndex(newIndex);
    }
  }

  public save(): void {
    this.changesMade = false;
    this.saveSuccess = true;
    this.declarationCheck = false;
  }

  public backLink(): string {
    let linkType = this.IS_PEOPLE_TABLE ? "user" : "site";
    return `/verifier/dashboard/${linkType}`
  }

  // TODO:! Build breadcrumb like mobile for http://pebbleroad.github.io/taxonomy-browser/build/#
  buildBreadCrumb(column: MillerColumn){
    // let title = '';
    // for (let index = column.index; index < this._columns.length; index++) {
    //   const col = this._columns[index];
    //   console.log(`${column.title} -- ${col.title}`)
    //   title += col.title;
    // }
    // console.log(`${column.title} == ${title}\n`)

    // return `Breadcrumb - ${title}`;
    return column.title;
  }

  /**
   * Returns the column that the provided item belongs to (from this._columns)
   */
  private findColumnIndexFromItem(item: MillerItem): number{
    let result;

    //Loop through all columns
    for (let colIndex = 0; colIndex < this._columns.length; colIndex++) {
      const column = this._columns[colIndex];
      // Loop through items in columns to find match
      for (let i = 0; i < column['items'].length; i++) {
        const colItem = column['items'][i];
        if (colItem === item){
          return colIndex;
        }
      }
    }

    return null;
  }

  private findItemsAtColIndex(item: MillerItem, targetColIndex: number): MillerItem[] {
    // First, filter out data that doesn't apply to get our column data
    let data = this.config.data[this.columnOrder[targetColIndex].toLowerCase()]
    .filter((x: any) => {
      if (!x.associationId) return true;
      return x.associationId.indexOf(item.objectId) !== -1;
    })

    // Second, update new column attributes on selections in previous columns
    data = this.recalculateColumnStatus(data, item);
    return data;
  }


  isSiteColumn(col: Site[] | Collection[] | Person[] | MillerItem[] | any[]): col is Site[] {
    return (<Site[]>col)[0]._isSite !== undefined;
  }

  /** Calculates column statuses based on selections in previous columns. INCOMPLETE! Does not handle enrollment/site page. .*/
  private recalculateColumnStatus(column: any[], originalSelection: MillerItem ): MillerItem[] {
    // Clone the column so that when we filter out irrelevant data it doesn't destroy the underlying data.
    column = cloneDeep(column);

    if (this.IS_PEOPLE_TABLE && this.isSiteColumn(column)) { // Last column
      // First selection is Person, so we filter SA's based on that
      let selection = this.getUserSelection();
      // Now, we filter the new column and strip all SA's not related to user
       column = column.map(site => {
        site.siteAccess = site.siteAccess.filter(sa => {
          // Since we clone, we have to check on ID not pure identity
          return sa.person.objectId === selection.objectId;
        });
        return site;
      });

      // Now that we've filtered out irrelevant SA's, we can easily check items
      // that have Active SAs.
      column
        .filter(item => item.siteAccess.length)
        .filter(item => item.siteAccess[0].status === 'Active')
        .map(item => item.checked = true);
    }

    //TODO: Have to do filtering for the other table type

    // Sort so all checked items are at the top
    column.sort((a, b) => {
      if (a.checked || b.checked){
        return b.checked ? 1 : 0;
      }
      else {
        // Sort remainder alphabetically
        return a.name > b.name ? 1 : 0;
      }
    });

    // Add "Active" badge
    return column;
  }

  public getUserSelection(){
    if (this.IS_PEOPLE_TABLE){
      return this._columns[0].items.filter(x => x.open)[0];
    }
  }

  public getSelectedSiteAccess(){
    // TODO: Add types

    if (this.IS_PEOPLE_TABLE){ // items are Sites
      return (this._columns[0].items.filter(x => x.open)[0] as any).siteAccess;
    }
    else { // items are Collections
      return (this._columns[0].items.filter(x => x.open)[0] as any).allSiteAccess
    }

  }

  private cleanUpChildColumns(index){
      // De-select all cells in closed columns
      for (let i = index; i < this._columns.length; i++) {
        const column = this._columns[i];
        column['items'].map(x => x.open = false);
      }
  }
}
