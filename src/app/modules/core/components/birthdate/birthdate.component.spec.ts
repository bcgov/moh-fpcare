import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {BirthDateComponent} from './birthdate.component';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {CalendarDayValidatorDirective} from '../date/calendar-day.validator';
import {CalendarYearValidatorDirective} from '../date/calendar-year.validator';
import {CalendarFieldFormatterDirective} from '../date/calendar-field-formatter.directive';

describe('BirthDateComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BirthDateComponent,
        CalendarFieldFormatterDirective,
        CalendarYearValidatorDirective,
        CalendarDayValidatorDirective
      ],
      imports: [
        FormsModule
      ],
      providers: [
        FPCareDataService
      ]
    });
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(BirthDateComponent);

    fixture.componentInstance.person = new Person();
    expect(fixture.componentInstance instanceof BirthDateComponent).toBe(true, 'should create BirthDateComponent');

  });
})
