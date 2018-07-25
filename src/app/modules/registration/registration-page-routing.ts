import { Routes } from '@angular/router';
import { CalculatorPageComponent } from './pages/calculator/calculator.component';
import { ChildrenPageComponent } from './pages/children/children.component';
import { CompletePageComponent } from './pages/complete/complete.component';
import { EligibilityPageComponent } from './pages/eligibility/eligibility.component';
import { MailingAddressPageComponent } from './pages/mailing-address/mailing-address.component';
import { PersonalInfoPageComponent } from './pages/personal-info/personal-info.component';
import { ReviewPageComponent } from './pages/review/review.component';

export const pageRoutes: Routes = [
    {
        path: 'financial',
        component: CalculatorPageComponent
    },
    {
        path: 'eligibility',
        component: EligibilityPageComponent
    },
    {
        path: 'personal-info',
        component: PersonalInfoPageComponent
    },
    {
        path: 'child-info',
        component: ChildrenPageComponent
    },
    {
        path: 'address',
        component: MailingAddressPageComponent
    },
    {
        path: 'review',
        component: ReviewPageComponent
    },
    {
        path: 'authorize',
        component: CompletePageComponent
    },
];