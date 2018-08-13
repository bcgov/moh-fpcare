import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationStatusRoutingModule } from './registration-status-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import {RegistrationStatusComponent} from './components/request-status/registration-status.component';
import {StatusResultsComponent} from './components/status-results/status-results.component';
import { CaptchaDataService } from 'mygovbc-captcha-widget/src/app/captcha-data.service';
import { CaptchaComponent } from 'mygovbc-captcha-widget/src/app/captcha/captcha.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RegistrationStatusRoutingModule,
  ],
  declarations: [
    RegistrationStatusComponent,
    StatusResultsComponent,
    CaptchaComponent,
  ],
  providers: [
    CaptchaDataService
  ]
})
export class RegistrationStatusModule { }
