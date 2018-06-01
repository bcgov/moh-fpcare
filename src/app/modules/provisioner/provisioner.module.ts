import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvisionerDashboardComponent } from './pages/provisioner-dashboard/provisioner-dashboard.component';
import { CoreModule } from '../core/core.module';
import { ProvisionerRoutingModule } from './provisioner-routing.modules';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProvisionerRoutingModule
  ],
  declarations: [ProvisionerDashboardComponent]
})
export class ProvisionerModule { }
