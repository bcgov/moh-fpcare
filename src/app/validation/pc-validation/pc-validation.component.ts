import { Component } from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {BaseValidationComponent} from '../base-validation.component';

@Component({
  selector: 'fpcare-pc-validation',
  templateUrl: './pc-validation.component.html',
  styleUrls: ['./pc-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class PcValidationComponent extends BaseValidationComponent {
  static regex: RegExp = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;

  public static ERROR_STRING = 'fpc-postalcode';

}
