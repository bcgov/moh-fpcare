import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {RequestCobComponent} from './modules/reprint-letters/components/request-cob/request-cob.component';
import {RequestConsentComponent} from './modules/reprint-letters/components/request-consent/request-consent.component';
import {ReprintStatusComponent} from './modules/reprint-letters/components/reprint-status/reprint-status.component';

const routes: Routes = [


  // ----- New Routes
  {
    path: '',
    component: HomePageComponent,
    data: { breadcrumb: 'Home'}
  },
  {
    path: 'demo',
    component: DemoPageComponent,
    data: {
      breadcrumb: 'Demo'
    }
  },

  // Lazy loading modules below
  {
    path: 'registration',
    loadChildren: 'app/modules/registration/registration.module#RegistrationModule'
  },
  {
    path: 'registration-status',
    loadChildren: 'app/modules/registration-status/registration-status.module#RegistrationStatusModule'
  },
  // These pages need to be directed to homepage in the event the URL is unknown -- BEGIN
  {
    path: 'request-reprint/cob',
    component: RequestCobComponent
  },
  {
    path: 'request-reprint/consent',
    component: RequestConsentComponent
  },
  {
    path: 'request-reprint/status',
    component: ReprintStatusComponent
  },
  // -- END
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
