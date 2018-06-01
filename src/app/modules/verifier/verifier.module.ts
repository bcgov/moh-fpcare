import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FPCareDataService } from '../../services/fpcare-data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VerifierRoutingModule } from './verifier-routing.modules';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardByUserComponent } from './pages/dashboard-page/dashboard-by-user/dashboard-by-user.component';
import { DashboardBySiteComponent } from './pages/dashboard-page/dashboard-by-site/dashboard-by-site.component';
import { SiteEnrollmentComponent } from './pages/site-enrollment/site-enrollment.component';
import { CoreModule } from '../core/core.module';
import { InfoButtonComponent } from './components/user-info-button/user-info-button.component';
import { MillerItemCheckboxComponent } from './components/miller-item-checkbox/miller-item-checkbox.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { EnrollmentRowComponent } from './components/enrollment-row/enrollment-row.component';
import { EnrollmentProgressRowComponent } from './components/enrollment-progress-row/enrollment-progress-row.component';
import { MillerColumnsComponent } from './components/miller-columns/miller-columns.component';
import { FormsModule } from '@angular/forms';
import { UserEnrollmentComponent } from './pages/user-enrollment/user-enrollment.component';

@NgModule({
  imports: [
    CommonModule,
    VerifierRoutingModule,
    NgxChartsModule,
    CoreModule,
    FormsModule,
  ],
  providers: [],
  declarations: [
    DashboardPageComponent,
    DashboardByUserComponent,
    DashboardBySiteComponent,
    UserEnrollmentComponent,
    SiteEnrollmentComponent,
    InfoButtonComponent,
    MillerItemCheckboxComponent,
    EnrollmentListComponent,
    EnrollmentRowComponent,
    EnrollmentProgressRowComponent,
    MillerColumnsComponent
  ],
  exports: [
    InfoButtonComponent,
    MillerItemCheckboxComponent,
    EnrollmentListComponent,
    EnrollmentRowComponent,
    EnrollmentProgressRowComponent,
    MillerColumnsComponent
  ]
})
export class VerifierModule { }
