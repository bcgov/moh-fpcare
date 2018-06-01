import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReviewSubmitComponent } from './review-submit.component';
// import { CaptchaComponent } from 'mygovbc-captcha-widget/src/captcha.component';
// let CaptchaComponent = require("mygovbc-captcha-widget/component").CaptchaComponent;
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { CollegeDataService } from '../../services/college-data.service';

import {Http, Headers, RequestOptions, ConnectionBackend, HttpModule} from '@angular/http';


describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule],
      declarations: [ReviewSubmitComponent, FPCareFormFooterComponent],
      providers: [ApplicantDataService, CollegeDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure simpleDate is non-null', () => {
    expect(component.convertSimpleDateToText({
        day: null, month: 12, year: 2012
    })).toBeNull();
    expect(component.convertSimpleDateToText({
        day: 12, month: null, year: 2012
    })).toBeNull();
    expect(component.convertSimpleDateToText({
        day: 10, month: 1, year: null
    })).toBeNull();
    expect(component.convertSimpleDateToText({
        day: null, month: null, year: null
    })).toBeNull();
  });

  it('should convert SimpleDate to text', () => {
    expect(component.convertSimpleDateToText({
      day: 1, month: 1, year: 2012
    })).toEqual('January 1st, 2012');
    expect(component.convertSimpleDateToText({
      day: 2, month: 8, year: 2018
    })).toEqual('August 2nd, 2018');

  });


});
