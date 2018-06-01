import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { Site, SiteAccess } from '../../../../models/sites.model';
import { Person } from '../../../../models/fpcare.models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { cloneDeep } from 'lodash';
import { growHorizontal } from '../../../../animations/animations';

@Component({
  selector: 'fpcare-info-button',
  templateUrl: './user-info-button.component.html',
  styleUrls: ['./user-info-button.component.scss'],
  animations: [growHorizontal]
})
export class InfoButtonComponent implements OnInit {

  /** The objectId of the target to look up. Must correspond to a Person or a Site, otherwise an error will be thrown. */
  @Input() targetId: string;
  modalRef: BsModalRef;
  public target: Site | Person;
  public targetType: TargetType;
  public TargetTypeEnum: typeof TargetType = TargetType;
  public editable: boolean = false;

  @ViewChild('personModal') personModalRef: ElementRef
  @ViewChild('siteModal') siteModalRef: ElementRef

  /**
   * A clone of the "real" object in the dataservice, is set if an only if
   * targetType=Person.
   */
  public person: Person;
  /**
   * A clone of the "real" object in the dataservice, is set if an only if
   * targetType=Site.
   */
  public site: Site;

  constructor(private dataService: FPCareDataService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(event: Event){
    event.stopPropagation();
    if (!this.target){
      this.loadTarget(this.targetId)
    }
    this.modalRef = this.modalService.show(this.modalElementRef, {class: 'modal-lg'});
  }

  edit(){
    this.editable = true;
  }

  discard(){
    let restore = this.lookupObjectId(this.person.objectId);
    if (!Site.isSiteGuard(restore)){
      this.person = restore;
    }
    else {
      this.site = restore;
    }
    this.shouldShowreasonForDeactivation = [];
    this.doneEditting();
  }

  // TODO: Test! Think it's broken now.
  save(){

    let source = this.lookupObjectId(this.person.objectId);

    if (!Site.isSiteGuard(source)){
      source.name = this.person.name;
      source.dateOfBirth = this.person.dateOfBirth
      source.phone = this.person.phone;
      source.phoneSecondary = this.person.phoneSecondary;
      source.renewalDate = this.person.renewalDate;
      source.address.postal = this.person.address.postal;
      source.siteAccess = this.person.siteAccess;
    }
    else {
      // TODO: Save all Site attributes based on this.site
      console.log('todo');

    }

    this.doneEditting();
  }

  doneEditting(){
    this.editable = false;
    this.loadTarget(this.person.objectId);
  }

  public shouldShowreasonForDeactivation: boolean[] = [];
  onSetEndDate(evt: Date, siteAccess){
    this.shouldShowreasonForDeactivation[siteAccess.objectId] = !!evt;
    siteAccess.endDate = evt;
  }

  private loadTarget(objectId){
    this.target = this.lookupObjectId(this.targetId);

    if (Site.isSiteGuard(this.target)){
      this.targetType = TargetType.Site;
      this.site = cloneDeep(this.target);
    }
    else {
      this.targetType = TargetType.Person;
      this.person = cloneDeep(this.target);
    }
  }

  private lookupObjectId(objectId): Site | Person {
    let person = this.dataService.findPersonByObjectId(objectId);
    if (person) return person;
    let site = this.dataService.findSiteByObjectId(objectId);
    if (site) return site;

    throw "Unable to find objectId. Double check it's valid.";
  }

  private get modalElementRef(): ElementRef {
    if (this.targetType == TargetType.Person){
      return this.personModalRef;
    }
    else {
      return this.siteModalRef;
    }
  }

}

enum TargetType {
  Site,
  Person
}
