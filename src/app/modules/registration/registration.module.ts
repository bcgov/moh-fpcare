import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRequirementsComponent } from './pages/registration-requirements/registration-requirements.component';
import { CalculatorPageComponent } from './pages/calculator/calculator.component';
import { EligibilityPageComponent } from './pages/eligibility/eligibility.component';
import { PersonalInfoPageComponent } from './pages/personal-info/personal-info.component';
import { ChildrenPageComponent } from './pages/children/children.component';
import { MailingAddressPageComponent } from './pages/mailing-address/mailing-address.component';
import { ReviewPageComponent } from './pages/review/review.component';
import { CompletePageComponent } from './pages/complete/complete.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { RegResultsComponent } from './pages/reg-results/reg-results.component';
import { FinancialCalculatorModule } from '../financial-calculator/financial-calculator.module';
import { TextMaskModule } from 'angular2-text-mask';
import { GeocoderModule } from '../geocoder/geocoder.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RegistrationRoutingModule,
    CoreModule,
    FinancialCalculatorModule,
    GeocoderModule,
    TextMaskModule
  ],
  declarations: [
    RegistrationContainerComponent,
    RegistrationRequirementsComponent,
    CalculatorPageComponent,
    EligibilityPageComponent,
    PersonalInfoPageComponent,
    ChildrenPageComponent,
    MailingAddressPageComponent,
    ReviewPageComponent,
    CompletePageComponent,
    RegResultsComponent
  ],
  exports: [
    CalculatorPageComponent
  ]
})
export class RegistrationModule {
}
