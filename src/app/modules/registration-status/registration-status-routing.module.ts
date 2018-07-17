import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {RegistrationStatusComponent} from './components/request-status/registration-status.component';
import {StatusResultsComponent} from './components/status-results/status-results.component';


export const pageRoutes: Routes = [
    {
        path: 'status',
        component: RegistrationStatusComponent
    },
    {
      path: 'status-results',
      component: StatusResultsComponent
    },
    {
        path: '**',
        redirectTo: 'status'
    }
];

@NgModule({
    imports: [RouterModule.forChild(pageRoutes)],
    exports: [RouterModule]
})
export class RegistrationStatusRoutingModule { }
