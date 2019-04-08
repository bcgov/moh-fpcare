import { Routes } from '@angular/router';
import { CalculatorPageComponent } from './pages/calculator/calculator.component';
import { ChildrenPageComponent } from './pages/children/children.component';
import { CompletePageComponent } from './pages/complete/complete.component';
import { EligibilityPageComponent } from './pages/eligibility/eligibility.component';
import { MailingAddressPageComponent } from './pages/mailing-address/mailing-address.component';
import { PersonalInfoPageComponent } from './pages/personal-info/personal-info.component';
import { ReviewPageComponent } from './pages/review/review.component';
import {
  REGISTRATION_ADDRESS,
  REGISTRATION_AUTHORIZE,
  REGISTRATION_CHILD,
  REGISTRATION_ELIGIBILITY,
  REGISTRATION_FINANCIAL,
  REGISTRATION_PERSONAL,
  REGISTRATION_REVIEW
} from '../../models/route-paths.constants';

export const pageRoutes: Routes = [
    {
        path: REGISTRATION_FINANCIAL,
        component: CalculatorPageComponent,
        data: { title: 'Financial Calculator'}
    },
    {
        path: REGISTRATION_ELIGIBILITY,
        component: EligibilityPageComponent,
        data: { title: 'Eligibility'}
    },
    {
        path: REGISTRATION_PERSONAL,
        component: PersonalInfoPageComponent,
        data: { title: 'Family Information'}
    },
    {
        path: REGISTRATION_CHILD,
        component: ChildrenPageComponent,
        data: { title: 'Children Information'}
    },
    {
        path: REGISTRATION_ADDRESS,
        component: MailingAddressPageComponent,
        data: { title: 'Mailing Address'}
    },
    {
        path: REGISTRATION_REVIEW,
        component: ReviewPageComponent,
        data: { title: 'Review Application'}
    },
    {
        path: REGISTRATION_AUTHORIZE,
        component: CompletePageComponent,
        data: { title: 'Authorize Income Verification'}
    },
    {
        path: '',
        redirectTo: REGISTRATION_FINANCIAL
    }
];
