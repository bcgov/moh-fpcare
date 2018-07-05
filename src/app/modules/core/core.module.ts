import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AlertModule, TooltipModule, ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { MiniProgressBarComponent } from './components/mini-progress-bar/mini-progress-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { RouterModule } from '@angular/router';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FPCareToggleComponent } from './components/toggle/toggle.component';
import { PostalCodeComponent } from './components/postal-code/postal-code.component';
import { PageFrameworkComponent } from './components/page-framework/page-framework.component';
import { WizardProgressBarComponent } from './components/wizard-progress-bar/wizard-progress-bar.component';
import { CoreBreadcrumbComponent } from './components/core-breadcrumb/core-breadcrumb.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';


const componentList = [
  AlertComponent,
  MiniProgressBarComponent,
  DatepickerComponent,
  FPCareToggleComponent,
  PostalCodeComponent,
  PageFrameworkComponent,
  WizardProgressBarComponent,
  CoreBreadcrumbComponent,
  FormActionBarComponent,
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
    ModalModule.forRoot(),
    TextMaskModule,
  ],
  declarations: [
    componentList,
  ],
  exports: [
    componentList
  ]
})
export class CoreModule { }
