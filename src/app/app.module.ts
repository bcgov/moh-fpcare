import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { StickyModule } from 'ng2-sticky-kit';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './core/address/address.component';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';
import { ConsentModalComponent } from './core/consent-modal/consent-modal.component';
import { CalendarDayValidatorDirective } from './core/date/calendar-day.validator';
import { CalendarFieldFormatterDirective } from './core/date/calendar-field-formatter.directive';
import { CalendarFutureDatesDirective } from './core/date/calendar-future-dates.validator';
import { CalendarMonthValidatorDirective } from './core/date/calendar-month.validator';
import { CalendarYearValidatorDirective } from './core/date/calendar-year.validator';
import { FPCareDateComponent } from './core/date/date.component';
import { FileUploaderComponent } from './core/file-uploader/file-uploader.component';
import { FPCareFormFooterComponent } from './core/form-footer/form-footer.component';
import { ProgressBarComponent } from './core/progress-bar/progress-bar.component';
import { CoreModule } from './modules/core/core.module';
import { FPCareDataModule } from './modules/fpcare-data/fpcare-data.module';
// import { FPCareToggleComponent } from './core/toggle/toggle.component';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfessionalInfoComponent } from './pages/professional-info/professional-info.component';
import { ReviewSubmitComponent } from './pages/review-submit/review-submit.component';
import { SelfDeclarationComponent } from './pages/self-declaration/self-declaration.component';
import { SiteAccessComponent } from './pages/site-access/site-access.component';
import { UserAcceptanceComponent } from './pages/user-acceptance/user-acceptance.component';
import { ApplicantDataService } from './services/applicant-data.service';
import { CollegeDataService } from './services/college-data.service';
import { DummyDataService } from './services/dummy-data.service';
import { FPCareDataService } from './services/fpcare-data.service';
import { UserService } from './services/user.service';
import { VerifierService } from './services/verifier.service';
import { EmailValidationComponent } from './validation/email-validation/email-validation.component';
import { PhoneValidationComponent } from './validation/phone-validation/phone-validation.component';
import { FPCareRequiredDirective } from './validation/fpcare-required.directive';
import { RequiredValidationErrorsComponent } from './validation/required-validation/required-validation.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    ConsentModalComponent,
    ProfessionalInfoComponent,
    FPCareDateComponent,
    CalendarFieldFormatterDirective,
    CalendarYearValidatorDirective,
    CalendarDayValidatorDirective,
    CalendarMonthValidatorDirective,
    CalendarFutureDatesDirective,
    ContactInformationComponent,
    SelfDeclarationComponent,
    UserAcceptanceComponent,
    ReviewSubmitComponent,
    SiteAccessComponent,
    AddressComponent,
    FileUploaderComponent,
    // CaptchaComponent,
    // FPCareToggleComponent, //Moving to CoreModule
    FPCareFormFooterComponent,
    FPCareRequiredDirective,
    RequiredValidationErrorsComponent,
    PhoneValidationComponent,
    EmailValidationComponent,
    DemoPageComponent,
    BreadcrumbComponent,
    HomePageComponent,
    BlankPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FPCareDataModule.forRoot(),
    CoreModule,
    ModalModule.forRoot(),
    StickyModule,
    NgxMyDatePickerModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    MyDateRangePickerModule,
    ButtonsModule.forRoot(),
  ],
  providers: [
    ApplicantDataService,
    CollegeDataService,
    UserService,
    VerifierService,
    DummyDataService,
    FPCareDataService
  ],
  entryComponents: [
    RequiredValidationErrorsComponent,
    PhoneValidationComponent,
    EmailValidationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
