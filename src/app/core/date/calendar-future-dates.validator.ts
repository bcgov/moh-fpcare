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

    const year: number = parseInt(control.value.year, 10);
    const month: number = parseInt(control.value.month, 10);
    const day: number = parseInt(control.value.day, 10);

    //Useful because we show error based on formRef being touched, not yearRef input.
    //Otherwise, validation shows up too early when user enters first digit of year.
    if (year.toString().length <= 3) {
      return null;
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
