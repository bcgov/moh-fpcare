import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {FormsModule} from '@angular/forms';

import { By } from '@angular/platform-browser';

fdescribe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let today: Date;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerComponent ],
      imports: [NgxMyDatePickerModule.forRoot(), FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    today = new Date();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle being created without a date', () => {
    expect(component).toBeTruthy();
    expect(component.date).toBeUndefined();
  });

  it('should handle being created with a date', () => {
    component.date = today;
    expect(component.date).toBeDefined();
    expect(component.date).toEqual(today); //Check strict identity, not just equivalence
  });

  it('should be able to clear date', () => {
    fixture.detectChanges();
    component.date = today;
    expect(component.date).toEqual(today);
    component.clearDate();
    expect(component.date).toBeNull('should be null after clearing');
  });

  it('should propertly detect a valid date', () => {
    component.date = today;
    expect(component.hasValidDate).toBe(true, 'should be valid when date is set to today');
  });

  it('should not have a valid date when date is null', () => {
    expect(component.hasValidDate).toBe(false, 'no date is set so valid date should be false.');
  });

  it('should format the date correctly', () => {
    const y2k = new Date('January 1 2000');
    component.date = y2k;
    fixture.detectChanges();
    expect(component.formattedDate).toBe('01/01/2000');
  });

  it('should format the date based on dateFormat', () => {
    const y2k = new Date('January 1 2000');
    component.date = y2k;
    component.dateFormat = 'yyyy-mm-dd';
    fixture.detectChanges();
    expect(component.formattedDate).toBe('2000-01-01');
  });


  it('should update formattedDate when date is changed', () => {
    const y2k = new Date('January 1 2000');
    component.date = y2k;
    fixture.detectChanges();
    expect(component.formattedDate).toBe('01/01/2000');
    const d2 = new Date('June 1 1990');
    component.date = d2;
    expect(component.formattedDate).toBe('01/06/1990');
  });


  it('should identify if an object is a date', () => {
    expect(component.isDate(today)).toBeTruthy();
    expect(component.isDate(new Date())).toBeTruthy();
    expect(component.isDate(true)).toBeFalsy();
    expect(component.isDate(null)).toBeFalsy();
    expect(component.isDate({year: 2000, month: 1, day: 1})).toBeFalsy();
  });

  it('should be disabled without controls when set to readOnly', () => {
    component.readOnly = true;
    const el = fixture.nativeElement;
    const readOnlyEl = el.querySelector('.datepicker--readonly');
    expect(readOnlyEl).toBeDefined('readonly input should exist instead of default element');
    const defaultEl = el.querySelector('.datepicker--default');
    expect(defaultEl).toBeNull('default input shouldn\'t exist');
    const inputGroup = el.querySelector('.input-group-append');
    expect(inputGroup).toBeNull('input group shouldn\'t exist when readonly');
  });

  it('should be show default input and controls', () => {
    const el = fixture.nativeElement;
    fixture.detectChanges();
    const defaultEl = el.querySelector('.datepicker--default');
    expect(defaultEl).toBeTruthy();
    const inputGroup = el.querySelector('.input-group-append');
    expect(inputGroup).toBeTruthy();
  });

  it('should be display the formatted text in the input element', () => {
    const el = fixture.nativeElement;
    const y2k = new Date('January 1 2000');
    component.date = y2k;
    fixture.detectChanges();
    expect(component.formattedDate).toBe('01/01/2000');
    const input = el.querySelector('input');

    fixture.whenStable().then( () => {
      expect(input.value).toBe('01/01/2000', 'value should be formatted in input');
    });
  });
});
