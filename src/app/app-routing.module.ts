import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentModalComponent } from './core/consent-modal/consent-modal.component';
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfessionalInfoComponent } from './pages/professional-info/professional-info.component';
import { ReviewSubmitComponent } from './pages/review-submit/review-submit.component';
import { SelfDeclarationComponent } from './pages/self-declaration/self-declaration.component';
import { SiteAccessComponent } from './pages/site-access/site-access.component';
import { UserAcceptanceComponent } from './pages/user-acceptance/user-acceptance.component';

const routes: Routes = [

  // --- Old Routes from prototype here! Scroll down to find new routes
  {
    path: 'professional-info',
    component: ProfessionalInfoComponent,
  },
  {
    path: 'prepare',
    component: ConsentModalComponent,
  },
  {
    path: 'site-access',
    component: SiteAccessComponent,
  },
  {
    path: 'contact-info',
    component: ContactInformationComponent
  },
  {
    path: 'self-declaration',
    component: SelfDeclarationComponent
  },
  {
    path: 'user-acceptance',
    component: UserAcceptanceComponent
  },
  {
    path: 'review-submit',
    component: ReviewSubmitComponent
  },


  // ----- New Routes
  {
    path: '',
    component: HomePageComponent,
    data: { breadcrumb: "Home"}
  },
  {
    path: 'demo',
    component: DemoPageComponent,
    data: {
      breadcrumb: "Demo"
    },
    //All these "Example" pages are just for demo purposes and can be removed.
    //They mainly demonstrate that the BreadcrumbComponent logic is sound.
    children: [
      {
        path: "ExampleA",
        data: { breadcrumb: "ExampleA"},
        component: BlankPageComponent
      },
      {
        path: "ExampleB",
        data: { breadcrumb: "ExampleB"},
        component: BlankPageComponent,
        children: [
          {
            path: "ExampleB-1",
            data: { breadcrumb: "ExampleB-1"},
            component: BlankPageComponent
          },
          {
            path: "ExampleB-2",
            data: { breadcrumb: "ExampleB-2"},
            component: BlankPageComponent
          },
        ]
      },
      {
        path: "ExampleC",
        data: { breadcrumb: "ExampleC"},
        component: BlankPageComponent
      }
    ]
  },

  // Lazy loading modules below
  {
    path: "verifier",
    loadChildren: "app/modules/verifier/verifier.module#VerifierModule"
  },
  {
    path: "applicant",
    loadChildren: "app/modules/applicant/applicant.module#ApplicantModule"
  },
  {
    path: "provisioner",
    loadChildren: "app/modules/provisioner/provisioner.module#ProvisionerModule"
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
