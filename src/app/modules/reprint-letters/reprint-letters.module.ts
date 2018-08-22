import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestTemplateComponent} from './components/request-template/request-template.component';
import {RequestConsentComponent} from './components/request-consent/request-consent.component';
import {ReprintStatusComponent} from './components/reprint-status/reprint-status.component';
import {RequestCobComponent} from './components/request-cob/request-cob.component';
import {ReprintLettersRoutingModule} from './reprint-letters-routing.module';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReprintLettersRoutingModule
  ],
  declarations: [
    RequestTemplateComponent,
    RequestConsentComponent,
    RequestCobComponent,
    ReprintStatusComponent
  ]
})
export class ReprintLettersModule { }
