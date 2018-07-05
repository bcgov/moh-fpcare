import { pageRoutes } from "./registration-page-routing";

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { RegistrationRequirementsComponent } from './pages/registration-requirements/registration-requirements.component';


export const routes: Routes = [
  {
    path: '',
    component: RegistrationContainerComponent,
    children: pageRoutes
  },
  

  // TODO: Move this out into just registration routes, it's not a subpage.
  {
    path: "requirements",
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
