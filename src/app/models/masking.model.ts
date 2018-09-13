//List of constants used for masking inputs
import {Base} from '../modules/core/components/base/base.class';
import {EventEmitter, Input, Output} from '@angular/core';

export const LETTER = /[A-Z]/i; //Ignore case here, then upperCase it via pipe.
export const NUMBER = /\d/;
export const SPACE = ' ';

export class Masking extends Base {

  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() disabled: boolean = false;

  constructor() {
    super();
  }

  /**
   * Upper cases letters in string
   * @param {string} text
   * @returns {string}
   */
  upperCasePipe(text: string) {
    return text.toUpperCase();
  }

  /**
   * Updates the value
   * @param {string} value
   */
  onUpdate( value: string ) {
    console.log( 'onUpdate: ', value );

    // Emit value without spaces
    this.valueChange.emit( value );
  }
}
