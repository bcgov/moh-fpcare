import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SplashPageRoutingModule } from './splash-page-routing.module';
import { SplashPageComponent } from './page/splash-page/splash-page.component';

@NgModule({
  imports: [
    CommonModule,
    SplashPageRoutingModule,
    CoreModule
  ],
  declarations: [SplashPageComponent]
})
export class SplashPageModule { }
