import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo-page/demo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {
  REGISTRATION_PATH,
  REGISTRATION_STATUS_PATH,
  REPRINT_LETTERS_PATH,
  STANDALONE_CALCULATOR,
  MAINTENANCE, ERROR_PAGE
} from './models/route-paths.constants';
import {ErrorPageComponent} from './pages/error-page/error-page.component';


const routes: Routes = [


  // ----- New Routes
  {
    path: '',
    component: HomePageComponent,
    data: { breadcrumb: 'Home'}
  },
  // {
  //   path: 'demo',
  //   component: DemoPageComponent,
  //   data: {
  //     breadcrumb: 'Demo'
  //   }
  // },

  // Lazy loading modules below
  {
    path: REGISTRATION_PATH,
    loadChildren: () => import('app/modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: REGISTRATION_STATUS_PATH,
    loadChildren: () => import('app/modules/registration-status/registration-status.module').then(m => m.RegistrationStatusModule)
  },
  {
    path: REPRINT_LETTERS_PATH,
    loadChildren: () => import('app/modules/reprint-letters/reprint-letters.module').then(m => m.ReprintLettersModule)
  },
  {
    path: STANDALONE_CALCULATOR,
    loadChildren: () => import('app/modules/financial-calculator/standalone-calculator-page/standalone-calculator-page.module').then(m => m.StandaloneCalculatorPageModule)
  },
  {
    path: MAINTENANCE,
    loadChildren: () => import('app/modules/splash-page/splash-page.module').then(m => m.SplashPageModule),
  },
  {
    path: ERROR_PAGE,
    component: ErrorPageComponent
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
