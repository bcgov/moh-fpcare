import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCobComponent } from './components/request-cob/request-cob.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { RequestLettersRoutingModule } from './request-letters-routing.module';
import { RequestTemplateComponent } from './components/request-template/request-template.component';
import { RequestConsentComponent } from './components/request-consent/request-consent.component';
import { CobResultsComponent } from './components/cob-results/cob-results.component';
import { ConsentResultsComponent } from './components/consent-results/consent-results.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RequestLettersRoutingModule
  ],
  declarations: [RequestCobComponent, RequestTemplateComponent, RequestConsentComponent, CobResultsComponent, ConsentResultsComponent]
})
export class RequestLettersModule { }
