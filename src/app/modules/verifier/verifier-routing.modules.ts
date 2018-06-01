import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../../pages/home-page/home-page.component';
import { DemoPageComponent } from '../../pages/demo-page/demo-page.component';
import { BlankPageComponent } from '../../pages/blank-page/blank-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardByUserComponent } from './pages/dashboard-page/dashboard-by-user/dashboard-by-user.component';
import { DashboardBySiteComponent } from './pages/dashboard-page/dashboard-by-site/dashboard-by-site.component';


// MOVE THESE TWO
import { UserEnrollmentComponent } from './pages/user-enrollment/user-enrollment.component';
import { SiteEnrollmentComponent } from './pages/site-enrollment/site-enrollment.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,

    children: [
      {
        path: 'user',
        component: DashboardByUserComponent,
      },
      {
        path: 'site',
        component: DashboardBySiteComponent,
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  },
  {
    path: 'enrollment',
    children: [
      /**
       * Enrollment routes below must be duplicated, one with /:id and one
       * without. Using :id allows deep linking to specific items.
       */
      {
        path: 'user',
        component: UserEnrollmentComponent,
      },
      {
        path: 'site',
        component: SiteEnrollmentComponent,
      },
      {
        path: 'user/:id',
        component: UserEnrollmentComponent,
      },
      {
        path: 'site/:id',
        component: SiteEnrollmentComponent,
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifierRoutingModule { }
