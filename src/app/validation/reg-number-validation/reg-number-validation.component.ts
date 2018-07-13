import { Component, OnInit } from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {PhoneValidationComponent} from '../phone-validation/phone-validation.component';
import {BaseValidationComponent} from '../base-validation.component';

@Component({
  selector: 'fpcare-reg-number-validation',
  templateUrl: './reg-number-validation.component.html',
  styleUrls: ['./reg-number-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class RegNumberValidationComponent extends BaseValidationComponent {
  static regex: RegExp = /^[A]{1}\d{8}$/;

  public static ERROR_STRING = 'fpc-regnumber';

}
