import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RequestCobComponent} from './components/request-cob/request-cob.component';
import {RequestConsentComponent} from './components/request-consent/request-consent.component';
import {ReprintStatusComponent} from './components/reprint-status/reprint-status.component';
import {REPRINT_COB, REPRINT_CONSENT, REPRINT_STATUS} from '../../models/route-paths.constants';

export const pageRoutes: Routes = [
  {
    path: REPRINT_COB,
    component: RequestCobComponent
  },
  {
    path: REPRINT_CONSENT,
    component: RequestConsentComponent
  },
  {
    path: REPRINT_STATUS,
    component: ReprintStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class ReprintLettersRoutingModule { }
