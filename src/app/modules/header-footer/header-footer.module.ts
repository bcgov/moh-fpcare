import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FPCareHeaderComponent } from './fpcare-header/fpcare-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FPCareHeaderComponent],
  exports: [FPCareHeaderComponent]
})
export class HeaderFooterModule { }
