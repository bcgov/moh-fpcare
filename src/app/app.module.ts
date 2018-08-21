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
import { CoreModule } from './modules/core/core.module';
import { FPCareDataModule } from './modules/fpcare-data/fpcare-data.module';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DummyDataService } from './services/dummy-data.service';
import { FPCareDataService } from './services/fpcare-data.service';
import { UserService } from './services/user.service';
import { HeaderFooterModule } from './modules/header-footer/header-footer.module';
import { ValidationService } from './services/validation.service';
import {RequestCobComponent} from './modules/reprint-letters/components/request-cob/request-cob.component';
import {RequestTemplateComponent} from './modules/reprint-letters/components/request-template/request-template.component';
import {RequestConsentComponent} from './modules/reprint-letters/components/request-consent/request-consent.component';
import {ReprintStatusComponent} from './modules/reprint-letters/components/reprint-status/reprint-status.component';
import {DateTimeService} from './services/date-time.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    HomePageComponent,
    BlankPageComponent,
    RequestTemplateComponent,
    RequestCobComponent,
    RequestConsentComponent,
    ReprintStatusComponent
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
    HeaderFooterModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    DummyDataService,
    FPCareDataService,
    ValidationService,
    DateTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
