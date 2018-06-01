import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FPCareDataService } from '../../services/fpcare-data.service';


/**
 * This module, specifically forRoot(), allows us to share the FPCareDataService
 * across feature modules. Without it, each module would have its own data
 * service and they couldn't speak to each other.
 */
@NgModule({})
export class FPCareDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FPCareDataModule,
      providers: [FPCareDataService]
    }
  }
}
