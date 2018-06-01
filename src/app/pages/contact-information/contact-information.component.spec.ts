import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactInformationComponent } from './contact-information.component';
import { FPCareDateComponent } from '../../core/date/date.component';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { AddressComponent } from '../../core/address/address.component';
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { CalendarFieldFormatterDirective } from '../../core/date/calendar-field-formatter.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarFutureDatesDirective } from '../../core/date/calendar-future-dates.validator';

describe('ContactInformationComponent', () => {
  let component: ContactInformationComponent;
  let fixture: ComponentFixture<ContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [
        ContactInformationComponent, FPCareDateComponent, AddressComponent,
        FPCareFormFooterComponent, CalendarFieldFormatterDirective,
        CalendarFutureDatesDirective
      ],
      providers: [ApplicantDataService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 security questions', () => {
    expect(component.securityQuestions.length).toEqual(10);
  });
});
