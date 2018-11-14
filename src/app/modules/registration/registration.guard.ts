import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { FPCareDataService } from '../../services/fpcare-data.service';
import {RegistrationService} from './registration.service';
import { REGISTRATION_PATH, REGISTRATION_REQUIREMENTS} from '../../models/route-paths.constants';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivateChild {

  /** Page to navigate to when continue process */
  private _requirementsUrl = REGISTRATION_PATH + '/' + REGISTRATION_REQUIREMENTS;

  constructor( private fpcareDataService: FPCareDataService
             , private registrationService: RegistrationService
             , private router: Router ) {

  }

  /**
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivateChild(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (environment.bypassGuards) {
      return true;
    }

   /* console.log( 'canActivateChild: ', next, state,
        this.fpcareDataService.acceptedCollectionNotice,
        this.registrationService.registrationItems,
        this.router.url ); */

     if ( !this.fpcareDataService.acceptedCollectionNotice || this.registrationService.isEmpty() ) {
       this.router.navigate( [this._requirementsUrl] );
       return false;
     }

     if ( !this.registrationService.isComplete( state.url ) ) {
      // console.log( 'Some registration item is not complete' );
       return false;
     }

    return true;
  }
}
