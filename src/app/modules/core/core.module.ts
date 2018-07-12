import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AlertModule, TooltipModule, ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { MiniProgressBarComponent } from './components/mini-progress-bar/mini-progress-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FPCareToggleComponent } from './components/toggle/toggle.component';
import { PostalCodeComponent } from './components/postal-code/postal-code.component';
import { PageFrameworkComponent } from './components/page-framework/page-framework.component';
import { WizardProgressBarComponent } from './components/wizard-progress-bar/wizard-progress-bar.component';
import { CoreBreadcrumbComponent } from './components/core-breadcrumb/core-breadcrumb.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { FPCareRequiredDirective } from '../../validation/fpcare-required.directive';
import { RequiredValidationErrorsComponent } from '../../validation/required-validation/required-validation.component';
import { PhoneValidationComponent } from '../../validation/phone-validation/phone-validation.component';
import { EmailValidationComponent } from '../../validation/email-validation/email-validation.component';
import { ConsentModalComponent } from './components/consent-modal/consent-modal.component';
import { CalendarFieldFormatterDirective } from './components/date/calendar-field-formatter.directive';
import { CalendarYearValidatorDirective } from './components/date/calendar-year.validator';
import { CalendarDayValidatorDirective } from './components/date/calendar-day.validator';
import { CalendarMonthValidatorDirective } from './components/date/calendar-month.validator';
import { CalendarFutureDatesDirective } from './components/date/calendar-future-dates.validator';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FPCareDateComponent } from './components/date/date.component';


const componentList = [
  AlertComponent,
  MiniProgressBarComponent,
  FPCareToggleComponent,
  PostalCodeComponent,
  PageFrameworkComponent,
  WizardProgressBarComponent,
  CoreBreadcrumbComponent,
  FormActionBarComponent,
  FPCareRequiredDirective,
  RequiredValidationErrorsComponent,
  PhoneValidationComponent,
  EmailValidationComponent,
  ConsentModalComponent,
  CalendarFieldFormatterDirective,
  CalendarYearValidatorDirective,
  CalendarDayValidatorDirective,
  CalendarMonthValidatorDirective,
  CalendarFutureDatesDirective,
  FileUploaderComponent,
  FPCareDateComponent
]

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    NgxChartsModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    RouterModule,
    NgxMyDatePickerModule.forRoot(),
    ModalModule.forRoot(),
    TextMaskModule,
  ],
  declarations: [
    componentList,
  ],
  exports: [
    componentList
  ],
  entryComponents: [
    RequiredValidationErrorsComponent,
    PhoneValidationComponent,
    EmailValidationComponent
  ],
})
export class CoreModule { }
