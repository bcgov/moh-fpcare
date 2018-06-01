import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDashboardComponent } from './pages/applicant-dashboard/applicant-dashboard.component';
import { ApplicantRoutingModule } from './applicant-routing.modules';
import { CoreModule } from '../core/core.module';
import { ApplicantContactComponent } from './pages/applicant-contact/applicant-contact.component';
import { ApplicantProfessionalComponent } from './pages/applicant-professional/applicant-professional.component';
import { ApplicantSelfDeclarationComponent } from './pages/applicant-self-declaration/applicant-self-declaration.component';
import { ApplicantAccessAcceptanceComponent } from './pages/applicant-access-acceptance/applicant-access-acceptance.component';
import { FormsModule } from '@angular/forms';
import { ApplicantBreadcrumbsComponent } from './components/applicant-breadcrumbs/applicant-breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    CoreModule,
    FormsModule,
  ],
  declarations: [ApplicantDashboardComponent, ApplicantContactComponent, ApplicantProfessionalComponent, ApplicantSelfDeclarationComponent, ApplicantAccessAcceptanceComponent, ApplicantBreadcrumbsComponent]
})
export class ApplicantModule { }
