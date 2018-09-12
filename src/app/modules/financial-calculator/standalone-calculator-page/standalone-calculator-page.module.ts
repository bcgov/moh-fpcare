import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandaloneCalculatorPageRoutingModule } from './standalone-calculator-page-routing.module';
import { RegistrationModule } from '../../registration/registration.module';

@NgModule({
  imports: [
    CommonModule,
    StandaloneCalculatorPageRoutingModule,
    RegistrationModule
  ],
  declarations: []
})
export class StandaloneCalculatorPageModule { }
