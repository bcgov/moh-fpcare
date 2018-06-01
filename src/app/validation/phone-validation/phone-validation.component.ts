import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ValidationComponent, staticImplements } from '../validation-component.interface';
import { BaseValidationComponent } from '../base-validation.component';

@Component({
  selector: 'app-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class PhoneValidationComponent extends BaseValidationComponent {
  static regex: RegExp = /^[2-9]{1}\d{2}[\-]?\d{3}[\-]?\d{4}$/;
}
