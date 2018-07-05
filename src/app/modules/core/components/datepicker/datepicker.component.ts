import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel, IMyDate } from 'ngx-mydatepicker';


/**
 * FPCARE datepicker component. Largely a wrapper for ngx-mydatepicker
 * https://github.com/kekeh/ngx-mydatepicker
 */
@Component({
  selector: 'fpcare-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  /** Component size can be reduced, see Datepickersizes for options */
  @Input() size: DatepickerSizes = DatepickerSizes.DEFAULT;
  @Input() date: IMyDate | Date;
  @Output() dateChange = new EventEmitter<IMyDate | Date>();
  @Input() disabled: boolean;

  /** Format for how to display the date to the user. */
  @Input() dateFormat: string = 'dd/mm/yyyy';

  /** Short month labels used in formatted date string.  */
  monthLabels: IMyMonthLabels = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };

  /** Datetime model used to interface with ngx-datepicker. */
  model: any;

  // Make enum accessible in HTML
  DatepickerSizes: typeof DatepickerSizes = DatepickerSizes;

  /** Default options for wrapped ngx-datepicker. */
  datepickerOptions: INgxMyDpOptions;

  constructor() { }

  convertDateToSimpleDate(date: Date):IMyDate {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
   }
  convertSimpleDateToDate(date: IMyDate):Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  isDate(x: any): x is Date {
    return x.getDate !== undefined;
  }

  isSimpleDate(x: any): x is IMyDate {
    return x.year !== undefined;
  }


  ngOnInit() {

    this.datepickerOptions = {
      dateFormat: this.dateFormat,
      sunHighlight: false,
    };

    if (this.size === DatepickerSizes.MINI) {
      //Set width/height to 4/5 of default
      this.datepickerOptions.selectorHeight = '185px';
      this.datepickerOptions.selectorWidth = '201px';
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.date || this.date === null) { //Just not `undefined`

      let date;
      if (this.date === null){
        date = null;
      }
      else {
        date = this.isDate(this.date) ? this.convertDateToSimpleDate(this.date) : this.date;
      }


      this.model = {
        date: this.date,
        formatted: this.formatDate(date, this.dateFormat, this.monthLabels)
      }
    }

  }

  onDateChanged(event: IMyDateModel): void {


    if (event.date) {
      let date = this.isDate(event.date) ? this.convertDateToSimpleDate(event.date) : event.date;


      // User has cleared the date, so we want to return null.
      if (date.year === 0 && date.month === 0 && date.day === 0) {
        this.dateChange.emit(null);
      }
      else {
        // Emit out same type they put in
        this.dateChange.emit(event.date);
      }
    }
  }

  get hasValidDate(): boolean {
    // Can be improved in the future, now we just check if we have a formatted date string.
    return !!(this.model && this.model.formatted)
  }

  // Copied from ngx-datepicker to ensure formatting is identical. Let's us
  // pre-generate formatted strings and avoid an update cycle loop in Angular.
  // https://github.com/kekeh/ngx-mydatepicker/blob/3c59db9cb41efd134b0295e7082b009ea5e76430/src/ngx-my-date-picker/services/ngx-my-date-picker.util.service.ts
  private formatDate(date: IMyDate, dateFormat: string, monthLabels: IMyMonthLabels): string {
    const M = "m";
    const MM = "mm";
    const MMM = "mmm";
    const D = "d";
    const DD = "dd";
    const YYYY = "yyyy";

    if (this.date === null) {
      return null;
    }


    let formatted: string = dateFormat.replace(YYYY, String(date.year));

    if (dateFormat.indexOf(MMM) !== -1) {
      formatted = formatted.replace(MMM, monthLabels[date.month]);
    }
    else if (dateFormat.indexOf(MM) !== -1) {
      formatted = formatted.replace(MM, this.preZero(date.month));
    }
    else {
      formatted = formatted.replace(M, String(date.month));
    }

    if (dateFormat.indexOf(DD) !== -1) {
      formatted = formatted.replace(DD, this.preZero(date.day));
    }
    else {
      formatted = formatted.replace(D, String(date.day));
    }
    return formatted;
  }

  private preZero(val: number): string {
    return val < 10 ? "0" + val : String(val);
  }

}

enum DatepickerSizes {
  MINI = "mini",
  DEFAULT = "default"
}

//FIXME: Bad! From vendor. Remove entrely?
// https://github.com/kekeh/ngx-mydatepicker/blob/3c59db9cb41efd134b0295e7082b009ea5e76430/src/ngx-my-date-picker/interfaces/my-month-labels.interface.ts
export interface IMyMonthLabels {
  [month: number]: string;
}
