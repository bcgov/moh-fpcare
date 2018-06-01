import {Directive, forwardRef, Input} from '@angular/core';
import {Validator, NG_VALIDATORS, FormControl} from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[validateCalendarYear][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CalendarYearValidatorDirective), multi: true
    }
  ]
})
export class CalendarYearValidatorDirective {

  validate(control: FormControl): {[key: string]: boolean; }  {
    // console.log('year value at validator: ' + control.value);
    // Get value out of control
    const year: string = control.value;

    const y: number = parseInt(year, 10);

    if ( moment().get('y') - y > 150){
      return {'yearDistantPast': true};
    }
    if ( y - moment().get('y') > 150){
      return {'yearDistantFuture': true};
    }

    return null;
  }

}
