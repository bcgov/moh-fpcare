import {
  Component, Input, Output, SimpleChanges,
  EventEmitter, ViewChild, ChangeDetectorRef,
  AfterViewInit, OnChanges
} from '@angular/core';
import {NgForm} from '@angular/forms';
// import {Address} from "../../model/address.model";
import './address.component.less';
// import {BaseComponent} from "../base.component";
import { Base } from '../base/base.class';
// import {MspProvinceComponent} from "../province/province.component";
// import {MspCountryComponent} from "../country/country.component";

import { Applicant } from '../../models/applicant.model';

@Component({
  selector: 'fpcare-address',
  templateUrl: './address.component.html'
})

/**
 * This class provides the address component on the contact-info page. It's in a
 * component in case it has to be reused, as well as to reduce template
 * complexity for the address page.
 *
 * This class was copied from MSP, the original can be found here:
 * https://github.com/bcgov/MyGovBC-MSP/blob/master/src/app/components/msp/common/address/address.component.ts
 */
export class AddressComponent extends Base implements AfterViewInit, OnChanges {
  private _useResidentialAddressLine2 = false;
  private _useResidentialAddressLine3 = false;
  private _useMailingAddressLine2 = false;
  private _useMailingAddressLine3 = false;

  @Input() applicant: Applicant;
  @Output() onApplicantChange: EventEmitter<Applicant> = new EventEmitter<Applicant>();


  // @Input() residentialAddress: Address;
  @Input() residentialAddress: any;
  @Input() mailingAddress: any;
  @Input() mailingSameAsResidentialAddress: boolean;
  @Output() mailingSameAsResidentialAddressChange = new EventEmitter<boolean>();
  // @Input() mailingAddress: Address;
  @Input() enableOutsideOfBC?: boolean;
  @Input() customResidentialMailingLabel?: string;
  @Input('mailingOnly') mailingOnly: boolean;
  // @Input() mailingAddressHeading:string = this.lang('./en/index.js').mailingAddressHeading;
  @Input() showError: boolean;

  @Output() onChange = new EventEmitter<any>();
  @ViewChild('formRef') form: NgForm;
  // @ViewChild('province') province: MspProvinceComponent;
  // @ViewChild('country') country: MspCountryComponent;

  // Address: typeof Address = Address;

  constructor() {
    super();
    this.residentialAddress = {};
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(values => {
      this.onChange.emit(values);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
