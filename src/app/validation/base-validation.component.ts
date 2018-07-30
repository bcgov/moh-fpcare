import { ElementRef, Input } from '@angular/core';
import { ValidationComponent, staticImplements } from './validation-component.interface';

/**
 * An abstract class which all fpcare validation components should extend from.
 *
 * If you only need a simple regex test, just overwrite `regex` prop. Otherwise,
 * overwrite the validation function in your subclass.
 *
 * Subclasses should also copy the staticImplements decorator as such:
 * `@staticImplements<ValidationComponent>()`
 *
 * Extended classes must have a template showing the validation error, e.g.
 *```
 *  <div role="alert" aria-live="assertive">
 *    <div class="text-danger">{{fieldName} is required</div>
 *  </div>
 * ```
 */
@staticImplements<ValidationComponent>()
export abstract class BaseValidationComponent {
  static regex: RegExp;
  @Input() public fieldName: string;

  public static ERROR_STRING = 'base-validation';

  /**
   * Validates the input's value based on the classes regex. Does not
   * require the field be filled out, but if it is must pass regex.
   *
   * @param input An ElementRef, or mocked class with input.nativeElement.value defined.
   */
  public static validate(input: ElementRef<HTMLInputElement>): boolean {
    const inputVal = input.nativeElement.value;
    if (inputVal == null || inputVal.length < 1) {
      return true;
    }
    return this.regex.test(inputVal);
  }
}
