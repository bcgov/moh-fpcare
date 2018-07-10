import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {RegistrationStatusComponent} from './modules/registration-status/registration-status.component';

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
    component: RegistrationStatusComponent,
    data: {
      breadcrumb: 'Status'
    }
  },
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
