import {Directive, forwardRef, Input} from '@angular/core';
import {Validator, NG_VALIDATORS, FormControl} from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[validateCalendarMonth][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CalendarMonthValidatorDirective), multi: true
    }
  ]
})
export class CalendarMonthValidatorDirective {

  validate(control: FormControl): {[key: string]: boolean; }  {

    // Get value out of control
    const month: string = control.value;

    if (month){
      const m: number = parseInt(month, 10);

      if (!(m > 0 && m < 13)){
        return {'calendarMonthOutOfRange': true};
      }
      return null;
    }else{
        return {'calendarMonthEmptyValue': true};
    }
  }

}
