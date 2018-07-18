import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {RequestCobComponent} from './components/request-cob/request-cob.component';


export const pageRoutes: Routes = [
    {
        path: 'cob',
        component: RequestCobComponent
    },
//    {
//      path: 'cob-results',
//      component:
//    },
    {
        path: '**',
        redirectTo: 'cob'
    }
];

@NgModule({
    imports: [RouterModule.forChild(pageRoutes)],
    exports: [RouterModule]
})
export class RequestLettersRoutingModule { }
