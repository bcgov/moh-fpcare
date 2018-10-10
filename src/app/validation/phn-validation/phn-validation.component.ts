import {Component, ElementRef, Input} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {BaseValidationComponent} from '../base-validation.component';
import {ValidationService} from '../../services/validation.service';
import {environment} from 'environments/environment';

@Component({
  selector: 'fpcare-phn-validation',
  templateUrl: './phn-validation.component.html',
  styleUrls: ['./phn-validation.component.scss']
})
@staticImplements<ValidationComponent>( )
export class PhnValidationComponent extends BaseValidationComponent {

  @Input() public fieldName = 'DEFAULT_FIELD_NAME'; //should be overwritten at runtime, but write unit tests to check!

  public static ERROR_STRING = 'fpc-phn';

  public static validate(el: ElementRef): boolean {
    const inputVal = el.nativeElement.value;

    // Empty field
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }

    // Remove spaces - mask format
    const phn = inputVal.replace(/ /g, '');

    return ValidationService.validatePHN( phn, true );
  }

}
