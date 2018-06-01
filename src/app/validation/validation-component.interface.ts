import { ElementRef } from '@angular/core';

export interface ValidationComponent {
  fieldName?: string;
  validate: (input: ElementRef) => boolean;
}

/**
 * Similar to the `implements` keyword, but also works for static functions.
 * Necessary to use with ValidationComponent, as `validate` is static.
 */
export function staticImplements<T>() {
  return (constructor: T) => {};
}
