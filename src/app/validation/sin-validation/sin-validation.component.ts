import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {staticImplements, ValidationComponent} from '../validation-component.interface';
import {ValidationService} from '../../services/validation.service';
import {BaseValidationComponent} from '../base-validation.component';

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
    return ValidationService.validateSIN( el.nativeElement.value );
  }

}
