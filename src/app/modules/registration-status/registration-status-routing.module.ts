import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistrationStatusComponent } from './components/request-status/registration-status.component';
import { StatusResultsComponent } from './components/status-results/status-results.component';
import { REQUEST_REG_STATUS, RESULT_REG_STATUS } from '../../models/route-paths.constants';


export const pageRoutes: Routes = [
    {
        path: REQUEST_REG_STATUS,
        component: RegistrationStatusComponent,
        data: { title: 'Registration Status Search' }
    },
    {
        path: RESULT_REG_STATUS,
        component: StatusResultsComponent,
        data: { title: 'Registration Status Search Results'}
    },
    // We have to redirect _somewhere_, so picked one arbitrarily.
    {
        path: '**',
        redirectTo: REQUEST_REG_STATUS
    }

];

@NgModule({
    imports: [RouterModule.forChild(pageRoutes)],
    exports: [RouterModule]
})
export class RegistrationStatusRoutingModule { }
