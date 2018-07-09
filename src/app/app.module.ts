import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ConsentModalComponent } from './modules/core/components/consent-modal/consent-modal.component';
import { CalendarDayValidatorDirective } from './modules/core/components/date/calendar-day.validator';
import { CalendarFieldFormatterDirective } from './modules/core/components/date/calendar-field-formatter.directive';
import { CalendarFutureDatesDirective } from './modules/core/components/date/calendar-future-dates.validator';
import { CalendarMonthValidatorDirective } from './modules/core/components/date/calendar-month.validator';
import { CalendarYearValidatorDirective } from './modules/core/components/date/calendar-year.validator';
import { FPCareDateComponent } from './modules/core/components/date/date.component';
import { FileUploaderComponent } from './modules/core/components/file-uploader/file-uploader.component';
import { CoreModule } from './modules/core/core.module';
import { FPCareDataModule } from './modules/fpcare-data/fpcare-data.module';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DummyDataService } from './services/dummy-data.service';
import { FPCareDataService } from './services/fpcare-data.service';
import { UserService } from './services/user.service';
import { EmailValidationComponent } from './validation/email-validation/email-validation.component';
import { PhoneValidationComponent } from './validation/phone-validation/phone-validation.component';
import { FPCareRequiredDirective } from './validation/fpcare-required.directive';
import { RequiredValidationErrorsComponent } from './validation/required-validation/required-validation.component';
import { HeaderFooterModule } from './modules/header-footer/header-footer.module';
import { ValidationService } from './services/validation.service';


@NgModule({
  declarations: [
    AppComponent,
    ConsentModalComponent,
    FPCareDateComponent,
    CalendarFieldFormatterDirective,
    CalendarYearValidatorDirective,
    CalendarDayValidatorDirective,
    CalendarMonthValidatorDirective,
    CalendarFutureDatesDirective,
    FileUploaderComponent,
    DemoPageComponent,
    HomePageComponent,
    BlankPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    HeaderFooterModule
  ],
  providers: [
    UserService,
    DummyDataService,
    FPCareDataService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
