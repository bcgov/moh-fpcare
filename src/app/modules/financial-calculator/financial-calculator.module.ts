import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialCalculatorComponent } from './components/financial-calculator/financial-calculator.component';
import { AnnualDeductibleComponent } from './components/annual-deductible/annual-deductible.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FinancialCalculatorComponent, AnnualDeductibleComponent],
  exports: [FinancialCalculatorComponent, AnnualDeductibleComponent]
})
export class FinancialCalculatorModule { }
