import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {ValidationService} from '../../services/validation.service';
import {BaseValidationComponent} from '../base-validation.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'fpcare-sin-validation',
  templateUrl: './sin-validation.component.html',
  styleUrls: ['./sin-validation.component.scss']
})
@staticImplements<ValidationComponent>( )
export class SinValidationComponent extends BaseValidationComponent {

  @Input() public fieldName = 'DEFAULT_FIELD_NAME'; //should be overwritten at runtime, but write unit tests to check!

  public static ERROR_STRING = 'fpc-sin';

  public static validate(el: ElementRef): boolean {
    const inputVal = el.nativeElement.value;


    // Empty field
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }

    // Remove spaces - mask format
    const sin = inputVal.replace(/ /g, '');

    return ValidationService.validateSIN( sin );
  }

}
