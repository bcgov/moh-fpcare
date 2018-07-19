import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {RequestCobComponent} from './components/request-cob/request-cob.component';
import {RequestConsentComponent} from './components/request-consent/request-consent.component';
import {ConsentResultsComponent} from './components/consent-results/consent-results.component';
import {CobResultsComponent} from './components/cob-results/cob-results.component';


export const pageRoutes: Routes = [
  {
    path: 'cob',
    component: RequestCobComponent
  },
  {
    path: 'cob-results',
    component: CobResultsComponent
  },
  {
    path: 'consent',
    component: RequestConsentComponent
  },
  {
    path: 'consent-results',
    component: ConsentResultsComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(pageRoutes)],
    exports: [RouterModule]
})
export class RequestLettersRoutingModule { }
