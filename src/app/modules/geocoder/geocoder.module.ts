import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeocoderInputComponent } from './components/geocoder-input/geocoder-input.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [GeocoderInputComponent],
  exports: [GeocoderInputComponent]
})
export class GeocoderModule { }
