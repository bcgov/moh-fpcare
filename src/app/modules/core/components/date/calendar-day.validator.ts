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
export class CalendarDayValidatorDirective implements Validator {

  /** An integer representing the selected month. Jan=1 ... Dec=12 */
  @Input() selectedMonth: number;
  /** A 4 digit integer representing the year, e.g. 1950. */
  @Input() selectedYear: number;

  validate(control: FormControl): {[key: string]: boolean; }  {

    // Get value out of control
    let day: number = control.value;

    if (!day) return;

    // It's possible that the value passed will be 3 digits long.
    // CalendarFieldFormatterDirective will trim it down to 2 characters for the
    // user, however it's impossible to guarantee the order of directives.
    // Consequently, we must explicitly trim a 3rd character if it exists.
    if (day.toString().length > 2){
      day = parseInt( day.toString().slice(0, 2), 10);
    }

    let daysInMonth: number = moment(`${this.selectedYear}-${this.selectedMonth}`, 'YYYY-MM').daysInMonth();
    if (isNaN(daysInMonth)){
      daysInMonth = 31;
    }

    if (day > daysInMonth || day < 1){
      return {'calendarDayOutOfRange': true};
    }

    return null;
  }

}
