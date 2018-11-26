import { pageRoutes } from './registration-page-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { RegistrationRequirementsComponent } from './pages/registration-requirements/registration-requirements.component';
import {
  REGISTRATION_REQUIREMENTS,
  REGISTRATION_RESULTS
} from '../../models/route-paths.constants';
import {RegistrationGuard} from './registration.guard';
import {RegResultsComponent} from './pages/reg-results/reg-results.component';

export const routes: Routes = [
  {
    path: '',
    component: RegistrationContainerComponent,
    children: pageRoutes,
    canActivateChild: [RegistrationGuard]
  },
  {
    path: REGISTRATION_REQUIREMENTS,
    component: RegistrationRequirementsComponent,
    data: {title: 'Requirements'}
  },
  {
    path: REGISTRATION_RESULTS,
    component: RegResultsComponent,
    data: {title: 'Registration Status'}
  },
  {
    path: '**',
    redirectTo: REGISTRATION_REQUIREMENTS
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
