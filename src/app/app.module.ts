import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
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
import { HttpClientModule } from '@angular/common/http';
import {RegistrationService} from './modules/registration/registration.service';
import {fakeBackendProvider} from './_developmentHelpers/fake-backend';
import {environment} from '../environments/environment';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

// List of providers for applicant
const providerList: any = [
    UserService,
    DummyDataService,
    FPCareDataService,
    ValidationService,
    RegistrationService,
    Title,
];

if ( environment.useMockBackend ) {
  // provider used to create fake backend - development of registration modules
  providerList.push( fakeBackendProvider );
}

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    HomePageComponent,
    BlankPageComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FPCareDataModule.forRoot(),
    CoreModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HeaderFooterModule,
    HttpClientModule
  ],
  providers: [
    providerList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
