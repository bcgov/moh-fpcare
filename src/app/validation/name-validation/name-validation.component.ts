import {Component, ElementRef, Input} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {BaseValidationComponent} from '../base-validation.component';
import {ValidationService} from '../../services/validation.service';

@Component({
  selector: 'fpcare-name-validation',
  templateUrl: './name-validation.component.html',
  styleUrls: ['./name-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class NameValidationComponent extends BaseValidationComponent {
  @Input() public fieldName = 'DEFAULT_FIELD_NAME'; //should be overwritten at runtime, but write unit tests to check!

  static regex: RegExp = /^[a-zA-Z][a-zA-Z\-.' ]*$/;

  public static ERROR_STRING = 'fpc-name';

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
