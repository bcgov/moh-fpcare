import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {RequestCobComponent} from './modules/request-letters/components/request-cob/request-cob.component';
import {CobResultsComponent} from './modules/request-letters/components/cob-results/cob-results.component';
import {RequestConsentComponent} from './modules/request-letters/components/request-consent/request-consent.component';
import {ConsentResultsComponent} from './modules/request-letters/components/consent-results/consent-results.component';

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
    path: 'request-letter/cob',
    component: RequestCobComponent
  },
  {
    path: 'request-letter/cob-results',
    component: CobResultsComponent
  },
  {
    path: 'request-letter/consent',
    component: RequestConsentComponent
  },
  {
    path: 'request-letter/consent-results',
    component: ConsentResultsComponent
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
