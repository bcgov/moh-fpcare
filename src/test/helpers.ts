import { NgForm, ValidationErrors } from '@angular/forms';

export function getFormErrors(form: NgForm) {
  return Object.keys(form.controls)
    .map(key => form.controls[key].errors)
    .filter(x => x);
}

export function countErrorsWithKey(
  key: string,
  errors: ValidationErrors
): number {
  return errors.map(x => Object.keys(x)).filter(str => str.includes(key))
    .length;
}

export function formHasError(form: NgForm, errorKey: string, count = 1) {
  return countErrorsWithKey(errorKey, getFormErrors(form)) === count;
}
