import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorPageComponent } from '../../registration/pages/calculator/calculator.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPageComponent,
    data: { standalone: true, title: 'Standalone Financial Calculator' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandaloneCalculatorPageRoutingModule { }
