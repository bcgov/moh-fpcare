import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../core/alert/alert.component';
import { PillBadgeComponent } from '../../core/pill-badge/pill-badge.component';
import { DashboardBarComponent } from '../../core/dashboard-bar/dashboard-bar.component';
import { SiteAccessWidgetsComponent } from '../../core/site-access-widgets/site-access-widgets.component';
import { AlertModule, TooltipModule, ProgressbarModule } from 'ngx-bootstrap';
import { AddUserButtonComponent } from '../../core/add-user-button/add-user-button.component';
import { MiniProgressBarComponent } from '../../core/mini-progress-bar/mini-progress-bar.component';
import { ExpandingSearchComponent } from '../../core/expanding-search/expanding-search.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../app/core/datepicker/datepicker.component';
import { RouterModule } from '@angular/router';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FPCareDataModule } from '../fpcare-data/fpcare-data.module';
// import { InfoButtonComponent } from '../verifier/components/user-info-button/user-info-button.component';
import { FPCareToggleComponent } from '../../core/toggle/toggle.component';


const componentList = [
  AlertComponent,
  PillBadgeComponent,
  DashboardBarComponent,
  SiteAccessWidgetsComponent,
  AddUserButtonComponent,
  MiniProgressBarComponent,
  ExpandingSearchComponent,
  DatepickerComponent,
  FPCareToggleComponent
]

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    NgxChartsModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    RouterModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    componentList
  ],
  exports: [
    componentList
  ]
})
export class CoreModule { }
