import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationStatusRoutingModule } from './registration-status-routing.module';
import { RegistrationStatusComponent } from './components/registration-status.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RegistrationStatusRoutingModule
  ],
  declarations: [
    RegistrationStatusComponent
  ]
})
export class RegistrationStatusModule { }
