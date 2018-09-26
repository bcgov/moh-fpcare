import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RequestCobComponent} from './components/request-cob/request-cob.component';
import {RequestConsentComponent} from './components/request-consent/request-consent.component';
import {ReprintStatusComponent} from './components/reprint-status/reprint-status.component';
import {REPRINT_COB, REPRINT_CONSENT, REPRINT_STATUS} from '../../models/route-paths.constants';

export const pageRoutes: Routes = [
  {
    path: REPRINT_COB,
    component: RequestCobComponent,
    data: { title: 'Request Confirmation of Assistance' }
  },
  {
    path: REPRINT_CONSENT,
    component: RequestConsentComponent,
    data: { title: 'Request Consent Form'}
  },
  {
    path: REPRINT_STATUS,
    component: ReprintStatusComponent,
    data: { title: 'Reprint Letter Status'}
  },
  // We have to redirect _somewhere_, so picked one arbitrarily.
  {
    path: '**',
    redirectTo: REPRINT_COB
  }
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class ReprintLettersRoutingModule { }
