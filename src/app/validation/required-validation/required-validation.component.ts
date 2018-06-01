import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ValidationComponent, staticImplements } from '../validation-component.interface';
import { BaseValidationComponent } from '../base-validation.component';
@Component({
  selector: 'required-validation',
  templateUrl: './required-validation.component.html',
  styleUrls: ['./required-validation.component.scss']
})
@staticImplements<ValidationComponent>()
export class RequiredValidationErrorsComponent extends BaseValidationComponent {
  @Input() public fieldName = 'DEFAULT_FIELD_NAME'; //should be overwritten at runtime, but write unit tests to check!

  public static validate(el: ElementRef): boolean {
    return el.nativeElement.value.length > 0;
  }

}
