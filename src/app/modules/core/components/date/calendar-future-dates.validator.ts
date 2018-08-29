import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[validateCalendarFutureDates]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => CalendarFutureDatesDirective), multi: true
    }
  ]
})
export class CalendarFutureDatesDirective {

  /** One of "future", "past". Determines what validation errors are generated.*/
  @Input() validateCalendarFutureDates: string;

  validate(control: FormControl): { [key: string]: boolean; } {

    if (!this.validateCalendarFutureDates) { return null; }

    //During view init control.value will be empty {}.
    if (!control.value.year || !control.value.month || !control.value.day) {
      return null;
    }

    // let year: number, month: number, day: number;
    let year: number = control.value.year;
    const month: number = control.value.month;
    let day: number = control.value.day;

    //Useful because we show error based on formRef being touched, not yearRef input.
    //Otherwise, validation shows up too early when user enters first digit of year.
    if (year.toString().length <= 3) {
      return null;
    }

    // Trim year and day to proper lengths if they're longer. See notes in
    // calendar-day and calendar-year validators for more info.
    if (year.toString().length > 4) {
      year = parseInt(year.toString().slice(0, 4), 10);
    }

    if (day.toString().length > 2) {
      day = parseInt(day.toString().slice(0, 2), 10);
    }

    const diff = moment({
      year: year,
      month: month - 1, //Moment starts month indice at 0.
      day: day
    }).diff(moment(), 'days', true);

    /**
     * Validate current date as if it's a future date, and reject it when only
     * accepting past dates.  We accomplish this by comparing diff against 1.
     */
    if (diff < -1 && this.validateCalendarFutureDates === 'future') {
      return { dateNotInPast: true, dateNotInFuture: false };
    }
    else if (diff >= -1 && this.validateCalendarFutureDates === 'past') {
      return { dateNotInPast: false, dateNotInFuture: true };
    }

    return null;
  }

}
