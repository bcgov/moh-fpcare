import { Routes } from '@angular/router';
import { CalculatorPageComponent } from './pages/calculator/calculator.component';
import { ChildrenPageComponent } from './pages/children/children.component';
import { CompletePageComponent } from './pages/complete/complete.component';
import { EligibilityPageComponent } from './pages/eligibility/eligibility.component';
import { MailingAddressPageComponent } from './pages/mailing-address/mailing-address.component';
import { PersonalInfoPageComponent } from './pages/personal-info/personal-info.component';
import { ReviewPageComponent } from './pages/review/review.component';
import {
  REGISTRATION_ADDRESS, REGISTRATION_AUTHORIZE,
  REGISTRATION_CHILD,
  REGISTRATION_ELIGIBILITY,
  REGISTRATION_FINANCIAL,
  REGISTRATION_PERSONAL, REGISTRATION_REVIEW
} from '../../models/route-paths.constants';

export const pageRoutes: Routes = [
    {
        path: REGISTRATION_FINANCIAL,
        component: CalculatorPageComponent
    },
    {
        path: REGISTRATION_ELIGIBILITY,
        component: EligibilityPageComponent
    },
    {
        path: REGISTRATION_PERSONAL,
        component: PersonalInfoPageComponent
    },
    {
        path: REGISTRATION_CHILD,
        component: ChildrenPageComponent
    },
    {
        path: REGISTRATION_ADDRESS,
        component: MailingAddressPageComponent
    },
    {
        path: REGISTRATION_REVIEW,
        component: ReviewPageComponent
    },
    {
        path: REGISTRATION_AUTHORIZE,
        component: CompletePageComponent
    },
];