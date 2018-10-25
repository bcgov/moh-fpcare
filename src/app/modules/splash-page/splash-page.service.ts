import { Injectable } from '@angular/core';
import { SpaEnvService, SpaEnvResponse } from '../../services/spa-env.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Responsible for determing if the splash page (aka maintenance mode) is
 * enabled. It uses the spa-env-server to get these values.
 * 
 * Subscribe to .values() to get the spa env values.
 */
@Injectable({
  providedIn: 'root'
})
export class SplashPageService {

  private loaded = false;
  public maintenanceMode: boolean = null;

  private _values = new BehaviorSubject<SpaEnvResponse>( null );
  /**
   * Currently this is all the values from the SpaEnvService, because all those
   * values are used for the splash service.
   */
  public values: Observable<SpaEnvResponse> = this._values.asObservable();


  constructor(private http: HttpClient, private envService: SpaEnvService, private router: Router) {
  }
  
  public setup(): void {
    this.load().then(isMaitenance => {
      if (isMaitenance) {
        this.router.navigate(['maintenance']);
      }
    });
  }

  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        resolve(this.maintenanceMode);
      }
      else {
        this.envService.loadEnvs().subscribe(envs => {
          this.loaded = true;
          this.maintenanceMode = envs.SPA_ENV_MSP_MAINTENANCE_FLAG.toLowerCase() === 'true';
          this._values.next(envs);
          resolve(this.maintenanceMode);
        });
      }

    });


  }

}
