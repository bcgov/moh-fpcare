import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, OnChanges} from '@angular/core';
import { INgxMyDpOptions, IMyDate, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { Base } from '../base/base.class';


/**
 * FPCARE datepicker component. Largely a wrapper for ngx-mydatepicker
 * https://github.com/kekeh/ngx-mydatepicker
 */
@Component({
  selector: 'fpcare-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends Base implements OnInit, OnChanges {
  /** Component size can be reduced, see Datepickersizes for options */
  @Input() size: DatepickerSizes = DatepickerSizes.DEFAULT;
  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();
  @Input() disabled: boolean;
  @Input() labelText: string;


  /** Dates **before** disableUntil will not be valid selections.  Maps to a ngx-mydatepicker option, but we convert IMyDate to Date  */
  @Input() disableUntil: Date;

  /** Dates **after** disableSince will not be valid selections.  Maps to a ngx-mydatepicker option, but we convert IMyDate to Date */
  @Input() disableSince: Date;

  /** Equivalent to setting disableBefore to tomorrow. */
  @Input() onlyFutureDates: boolean;

  /**
   * Control visibility of the clear 'x' button on the mini datepicker.
   *
   * **'visible'** is default, button exists
   *
   * **'none'** means the element does not exist
   *
   * **'invisible'** means the element takes up space but is not visible / cannot be
   * used.
   *
   * Invisible is useful when you want to make sure a datepicker is the same
   * size as a visible one.
   */
  @Input() clearButton: 'visible' | 'invisible' | 'none' = 'visible';

  /** Can only be used with DEFAULT datepickers (not mini). Similar to disabled,
   * but use this when the datepicker will **always** stay disabled for the
   * lifetime of the component.  There's a known issue with displaying dates
   * when the datepicker starts off disabled. */
  @Input() readOnly: boolean = false;



  /** Format for how to display the date to the user. */
  @Input() dateFormat: string = 'dd/mm/yyyy';

  /** Datetime model used to interface with ngx-datepicker. */
  //model: any;
  model: any;

  // Make enum accessible in HTML
  DatepickerSizes: typeof DatepickerSizes = DatepickerSizes;

  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;

  /** Default options for wrapped ngx-datepicker. */
  datepickerOptions: INgxMyDpOptions;

  constructor() {
    super();
   }

  convertDateToSimpleDate(date: Date): IMyDate {
    if (date === null || date === undefined ) { return null; }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
   }
  convertSimpleDateToDate(date: IMyDate): Date {
    // When ngx-mydatepicker is cleared, it returns {year: 0, month: 0, day: 0}
    if (date.year === 0){
      return null;
    }
    return new Date(date.year, date.month - 1, date.day);
  }

  isDate(x: any): x is Date {
    if (!x) return false;
    return x.getDate !== undefined;
  }

  ngOnInit() {

    this.datepickerOptions = {
      dateFormat: this.dateFormat,
      sunHighlight: false,
      appendSelectorToBody: true,
    };

    if (this.size === DatepickerSizes.MINI) {
      //Set width/height to 4/5 of default
      this.datepickerOptions.selectorHeight = '185px';
      this.datepickerOptions.selectorWidth = '201px';
    }

    if (this.isDate(this.disableSince)){
      this.datepickerOptions.disableSince = this.convertDateToSimpleDate(this.disableSince);
    }

    if (this.isDate(this.disableUntil)){
      this.datepickerOptions.disableUntil = this.convertDateToSimpleDate(this.disableSince);
    }

    if (this.onlyFutureDates){
      const today = new Date();
      this.datepickerOptions.disableUntil = this.convertDateToSimpleDate(today);
    }

    this.model = {
      jsDate: this.date,
      date: this.convertDateToSimpleDate(this.date),
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    // Parent component has passed in null, so we have to manually clear the input. This leads to 2 change detection cycles.
    // We could refactor it down to one, but the performance hit is minimal for such a simple component.
    // console.log('ngOnChanges', changes);
    if (this.date === null){
      this.clearDate();
    }
  }

  onDateChanged(event): void {
    // console.log('onDateChanged', event);
    if (event.jsdate || event.jsdate === null) {
      // Always emit a Date (or null)
      // console.log('onDateChanged EMIT');
      this.dateChange.emit(event.jsdate);
    }
  }

  clearDate(){
    if (this.ngxdp) {
      // We don't need to emit here, because by changing date we'll trigger onDateChanged automatically.
      this.date = null;
      this.ngxdp.clearDate();
    }
  }

  get hasValidDate(): boolean {
    // Can be improved in the future, now we just check if we have a formatted date string.
    return !!(this.date);
  }

  formatDate(date: Date): string{
    return moment(date).format(this.dateFormat.toUpperCase());
  }

  get formattedDate(): string {
    return this.formatDate(this.date);
  }

}

enum DatepickerSizes {
  MINI = 'mini',
  DEFAULT = 'default'
}
