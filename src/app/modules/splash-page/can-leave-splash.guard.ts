import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SplashPageService } from './splash-page.service';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanLeaveSplashGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(private splash: SplashPageService){}
  canDeactivate(){
    return !this.splash.maintenanceMode;
  }
}
