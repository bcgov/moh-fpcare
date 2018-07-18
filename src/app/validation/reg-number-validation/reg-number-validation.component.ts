import {Component, ElementRef} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {BaseValidationComponent} from '../base-validation.component';
import {ValidationService} from '../../services/validation.service';

@Component({
  selector: 'fpcare-reg-number-validation',
  templateUrl: './reg-number-validation.component.html',
  styleUrls: ['./reg-number-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class RegNumberValidationComponent extends BaseValidationComponent {
  static regex: RegExp = /^A|a\d{8}$/;

  public static ERROR_STRING = 'fpc-regnumber';

  /**
   * Validates the input's value based on the classes regex. Does not
   * require the field be filled out, but if it is must pass regex.
   *
   * @param input An ElementRef, or mocked class with input.nativeElement.value defined.
   */
  public static validate(input: ElementRef): boolean {
    const inputVal = input.nativeElement.value;
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }

    // check length
    if ( inputVal.length > ValidationService.MAX_REGNUM_LENGTH ) {
      return false;
    }

    return this.regex.test( inputVal );
  }

}
