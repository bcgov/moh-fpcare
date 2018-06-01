import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ValidationComponent, staticImplements } from '../validation-component.interface';
import { BaseValidationComponent } from '../base-validation.component';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class EmailValidationComponent extends BaseValidationComponent {
  // tslint:disable-next-line:max-line-length
  static regex: RegExp = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  @Input() public fieldName: string;
}



