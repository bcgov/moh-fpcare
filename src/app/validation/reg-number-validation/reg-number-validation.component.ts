import {Component, ElementRef} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {BaseValidationComponent} from '../base-validation.component';
import {ValidationService} from '../../services/validation.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'fpcare-reg-number-validation',
  templateUrl: './reg-number-validation.component.html',
  styleUrls: ['./reg-number-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class RegNumberValidationComponent extends BaseValidationComponent {
  static regex: RegExp = /^[A][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  public static ERROR_STRING = 'fpc-regnumber';

  /**
   * Validates the input's value based on the classes regex. Does not
   * require the field be filled out, but if it is must pass regex.
   *
   * @param input An ElementRef, or mocked class with input.nativeElement.value defined.
   */
  public static validate(input: ElementRef): boolean {
    const inputVal = input.nativeElement.value;

    // empty field
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }

    return this.regex.test( inputVal );
  }

}
