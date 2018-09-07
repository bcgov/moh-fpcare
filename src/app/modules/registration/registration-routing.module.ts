import { pageRoutes } from './registration-page-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { RegistrationRequirementsComponent } from './pages/registration-requirements/registration-requirements.component';
import {REGISTRATION_REQUIREMENTS} from '../../models/route-paths.constants';
import {RegistrationGuard} from './registration.guard';


export const routes: Routes = [
  {
    path: '',
    component: RegistrationContainerComponent,
    children: pageRoutes,
    canActivateChild: [RegistrationGuard]
  },


  // TODO: Move this out into just registration routes, it's not a subpage.
  {
    path: REGISTRATION_REQUIREMENTS,
    component: RegistrationRequirementsComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
