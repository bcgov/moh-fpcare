
import { ElementRef } from '@angular/core';

/**
 * Mocks an ElementRef, necessary to test BaseValidationComponent.validate().
 * Only mocks value field, the rest, including all DOM behaviour, is not mocked.
 *
 * @param phoneNum A string phone number
 */
export function mockValue(phoneNum: string): ElementRef{
  return new ElementRef({value: phoneNum});
}
