import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantDashboardComponent } from './pages/applicant-dashboard/applicant-dashboard.component';
import { ApplicantContactComponent } from './pages/applicant-contact/applicant-contact.component';
import { ApplicantAccessAcceptanceComponent } from './pages/applicant-access-acceptance/applicant-access-acceptance.component';
import { ApplicantProfessionalComponent } from './pages/applicant-professional/applicant-professional.component';
import { ApplicantSelfDeclarationComponent } from './pages/applicant-self-declaration/applicant-self-declaration.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: ApplicantDashboardComponent,
  },
  {
    path: 'contact',
    component: ApplicantContactComponent,
  },
  {
    path: 'access-acceptance',
    component: ApplicantAccessAcceptanceComponent,
  },
  {
    path: 'professional',
    component: ApplicantProfessionalComponent,
  },
  {
    path: 'self-declaration',
    component: ApplicantSelfDeclarationComponent,
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
export class ApplicantRoutingModule { }
