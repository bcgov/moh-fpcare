import {Directive, forwardRef, Input} from '@angular/core';
import {Validator, NG_VALIDATORS, FormControl} from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[validateCalendarDay][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CalendarDayValidatorDirective), multi: true
    }
  ]
})
export class CalendarDayValidatorDirective {

  validate(control: FormControl): {[key: string]: boolean; }  {

    // Get value out of control
    let day: number = control.value;

    if (!day) return;

    // It's possible that the value passed will be 3 digits long.
    // CalendarFieldFormatterDirective will trim it down to 2 characters for the
    // user, however it's impossible to guarantee the order of directives.
    // Consequently, we must explicitly trim a 3rd character if it exists.

    // TODO: Need to get "month" value in here to compare against days!

    if (day.toString().length > 2){
      day = parseInt( day.toString().slice(0, 2), 10);
    }

    if (day > 31 || day < 1){
      return {'calendarDayOutOfRange': true};
    }

    return null;
  }

}
