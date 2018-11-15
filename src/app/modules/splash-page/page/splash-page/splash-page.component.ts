import { Component, OnInit } from '@angular/core';
import { SplashPageService } from '../../splash-page.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Component({
  selector: 'fpcare-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss']
})
export class SplashPageComponent implements OnInit {

  constructor(private splashService: SplashPageService, private router: Router) { }

  public startTime: string;
  public endTime: string;
  public message: string;
  private sub$: Subscription;
  public links;

  ngOnInit() {
    this.links = environment.links;
    this.sub$ = this.splashService.values.subscribe(splashVals => {
      if (splashVals){
        this.startTime = splashVals.SPA_ENV_FPC_MAINTENANCE_START;
        this.endTime = splashVals.SPA_ENV_FPC_MAINTENANCE_END;
        this.message = splashVals.SPA_ENV_FPC_MAINTENANCE_MESSAGE;
      }
      // This effectively replaces a canLoad/canActivate route guard.
      // Unfortunately, these guards don't play nice with direct deep linking,
      // and redirect to a blank page.  This instead redirects to homepage.
      // We have to check this in the subscribe so we know it's updated
      if (!this.splashService.maintenanceMode){
        // Navigate back to homepage if someone tries to load the splash page when it's disabled.
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }

}
