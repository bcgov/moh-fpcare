import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalInfoComponent } from './professional-info.component';
import { CalendarYearValidatorDirective } from '../../core/date/calendar-year.validator';
import { FPCareDateComponent } from '../../core/date/date.component';
import { ConsentModalComponent } from '../../core/consent-modal/consent-modal.component';
import { FormsModule } from '@angular/forms';
import { CalendarFieldFormatterDirective } from '../../core/date/calendar-field-formatter.directive';
import { ModalModule } from 'ngx-bootstrap';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Colleges } from '../../models/colleges.enum';
import { FPCareToggleComponent } from '../../core/toggle/toggle.component';
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CollegeDataService } from '../../services/college-data.service';
import { CalendarFutureDatesDirective } from '../../core/date/calendar-future-dates.validator';



describe('ProfessionalInfoComponent', () => {
  let component: ProfessionalInfoComponent;
  let fixture: ComponentFixture<ProfessionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ApplicantDataService, CollegeDataService],
      imports: [FormsModule, ModalModule.forRoot(), RouterTestingModule],
      declarations: [
        ProfessionalInfoComponent, CalendarYearValidatorDirective,
        FPCareDateComponent, ConsentModalComponent,
        CalendarFieldFormatterDirective, FPCareToggleComponent,
        FPCareFormFooterComponent, CalendarFutureDatesDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have applicant', () => {
    expect(component.applicant).toBeTruthy();
  });

  it('should be able to set college selection', () => {
    //During dev, if app is in readOnly we populate dummy data. Once business decisions are nailed down, this will change.
    if (!component.readonly){
      expect(component.applicant.college).toBeUndefined();
    }
    component.applicant.college = [Colleges.None];
    expect(component.applicant.college[0] === Colleges.None).toBeTruthy();
    component.applicant.college = [Colleges.CPBC];
    expect(component.applicant.college[0] === Colleges.CPBC).toBeTruthy();
  });

  it('should be able to get college name from ID', () => {
    expect(component.getCollegeNameFromID('91')).toEqual('College of Physicians and Surgeons of BC (CPSBC) - 91');
    expect(component.getCollegeNameFromID('P1')).toEqual('College of Pharmacists of BC (CPBC) - P1');
    expect(component.getCollegeNameFromID('96')).toEqual('College of Registered Nurses of BC (CRNBC) - 96');
  });
});
