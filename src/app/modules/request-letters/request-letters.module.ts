import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCobComponent } from './components/request-cob/request-cob.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { RequestLettersRoutingModule } from './request-letters-routing.module';
import { RequestTemplateComponent } from './components/request-template/request-template.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RequestLettersRoutingModule
  ],
  declarations: [RequestCobComponent, RequestTemplateComponent]
})
export class RequestLettersModule { }
