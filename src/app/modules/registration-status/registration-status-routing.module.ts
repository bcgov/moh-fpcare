import { Routes, RouterModule } from '@angular/router';
import { RegistrationStatusComponent } from './components/registration-status.component';
import { NgModule } from '@angular/core';


export const pageRoutes: Routes = [
    {
        path: 'status',
        component: RegistrationStatusComponent
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