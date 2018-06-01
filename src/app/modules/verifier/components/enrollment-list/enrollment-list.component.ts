import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EnrollmentStatus } from '../../../../models/fpcare.models';
import { SiteAccess } from '../../../../models/sites.model';
import { VerifierService } from '../../../../services/verifier.service';
import { Base } from '../../../../core/base/base.class';
import { EnrollmentRowComponent } from '../enrollment-row/enrollment-row.component';
import { EnrollmentRowItem } from '../enrollment-row/enrollment-row.interface';

@Component({
  selector: 'fpcare-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss']
})
export class EnrollmentListComponent extends Base implements OnInit {
  @Input() rowItems: EnrollmentRowItem[];
  @ViewChildren(EnrollmentRowComponent) rowElements: QueryList<EnrollmentRowComponent>
  /** Internal representation of data used in for loops. Can be filtered by search. */
  public data: EnrollmentRowItem[];

  /** What the primary/top level rows are. Changes labels and some other layout configurations. */
  @Input() primaryType: "User"|"Site" = "Site";

  // Valid values: EnrollmentStatus enums + "All"
  public viewTypeSelector  = "All";

  //Convert enum to iterable array
  get EnrollmentStatus() {
    return Object.keys(EnrollmentStatus)
  }

  constructor(private verifierService: VerifierService) {
    super();

    verifierService.$enrollmentViewType.subscribe(viewType => {
      this.viewTypeSelector = viewType;
      this.viewTypes(viewType);
    })
  }

  ngOnInit() {
    this.data = this.rowItems;
  }

  ngOnChanges(changes){
    // Handle rows being added to rowItems, such as the "Add User Button" when on the user view
    if (changes.rowItems && changes.rowItems.currentValue && changes.rowItems.previousValue && changes.rowItems.currentValue.length > changes.rowItems.previousValue.length){
      this.data = this.rowItems;
    }
  }

  ngOnDestroy(){
    this.verifierService.enrollmentViewTypeSelector = "All";
  }

  rowOpened(item: EnrollmentRowComponent) {
    // console.log("rowOpened", { item, rowElements: this.rowElements });
    this.rowElements.filter(x => x !== item)
      .map(x => x.closeRow());
  }

  search(phrase){
    if (this.primaryType === 'Site') {
      this.searchSites(phrase);
    }
    else if (this.primaryType === 'User'){
      this.searchUsers(phrase);
    }
  }

  /**
   * Filters all expandable rows, making sure changes propagate up to the top
   * level rows. Just pass in a function which will filter, with its only
   * parameter being the ExpandableRow/SiteAccess
   *
   * @private
   * @param {(sa: SiteAccess) => boolean} fn Takes a SiteAccess as a parameter
   * @memberof EnrollmentListComponent
   */
  private deepSearch(fn: (sa: SiteAccess) => boolean    ){

    // Clone the source data so our changes do not wind up persisting in the underlying data
    let cloned = this.rowItems.map(x => Object.assign({}, x));

    this.data = cloned.map(enrollmentRow => {
      // Hide all subrows that don't match search results.
      enrollmentRow.expandableRows = enrollmentRow.expandableRows
      .filter(expandableRow => {
        return fn(expandableRow);
      });

      return enrollmentRow;
    }).filter(enrollmentRow => {
      // Only show rows with search results
      return enrollmentRow.expandableRows.length;
    })
  }

  // Searches based on the expandable rows, per business requirements (i.e. site name, NOT collection name!)
  searchSites(phrase){

    if (phrase.length === 0){
      return this.data = this.rowItems;
    }

    this.deepSearch(expandableRow => {
      return expandableRow.title.toLowerCase().indexOf(phrase.toLowerCase()) !== -1;
    })
  }

  // Searches based on the top level row (i.e. user name)
  searchUsers(phrase){
    this.data = this.rowItems.filter(x => {
      return x.title.toLowerCase().indexOf(phrase.toLowerCase()) !== -1;
    })
  }

  // NOTE: This doesn't work properly with search. Fine for prototype for now, but will need to be resolved in future.
  viewTypes(type){
    if (type === "All"){
      return this.data = this.rowItems;
    }

    this.deepSearch(expandableRow => {
      return expandableRow.status.includes(type);
    })
  }

  sort() {
    // Temporary solution for prototype before actual sorting is implemented.
    this.rowItems.reverse();
  }

}
