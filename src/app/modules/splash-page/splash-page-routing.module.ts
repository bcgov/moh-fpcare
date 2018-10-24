import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashPageComponent } from './page/splash-page/splash-page.component';
import { CanLeaveSplashGuard } from './can-leave-splash.guard';

const routes: Routes = [
  {
    path: '',
    component: SplashPageComponent,
    canDeactivate: [CanLeaveSplashGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [CanLeaveSplashGuard],
  exports: [RouterModule]
})
export class SplashPageRoutingModule { }
