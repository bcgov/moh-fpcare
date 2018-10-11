import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';
import {environment} from 'environments/environment';
import { ApiService } from './services/api-service.service';

import * as version from '../VERSION.generated';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Logger } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FPCare – Applicant Enrollment';


  constructor(private userService: UserService,
              private dummyDataService: DummyDataService,
              private fpcareDataService: FPCareDataService,
              private apiService: ApiService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private logger: Logger) {
  }

  ngOnInit() {
    // Testers have asked for Version to be logged with every build.
    if (version.success){
      console.log('%c' + version.message, 'color: #036; font-size: 20px;');
    }
    else {
      console.error(version.message);
    }

    this.updateTitleOnRouteChange();


    if ( environment.useDummyData ) {

      // Purpose: Development
      this.fpcareDataService.applicant = this.dummyDataService.createApplicant();
      // console.log( 'applicant: ', this.fpcareDataService.applicant );
      this.fpcareDataService.spouse = this.dummyDataService.createSpouse();
      this.fpcareDataService.hasSpouse = true;
      // console.log( 'spouse: ', this.fpcareDataService.spouse );
      this.fpcareDataService.dependants = this.dummyDataService.createChildren( 2 );
      // console.log( 'children: ', this.fpcareDataService.dependants );

      // financial information
      this.fpcareDataService.applicantIncome = 45000;
      this.fpcareDataService.spouseIncome = 50000;
      this.fpcareDataService.bornBefore1939 = true;
      this.fpcareDataService.disabilityAmount = 5000;
    }

    if (environment.promptOnExit){
      this.enablePromptOnExit();
    }

    if (environment.purgeWhenInactive){
      this.enablePurgeWhenInactive();
    }
  }

  /**
   * Listen to every route change, and update the page title based on the
   * 'title' property in the route's data.
   */
  private updateTitleOnRouteChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: { title?: string }) => {
      this.setTitle(data.title);
      this.logger.log({
        event: 'navigation',
        title: data.title ? data.title : this.title,
        url: this.router.url,
      });
    });
  }

  /** Set the page title. Includes basic formatting and fallback */
  private setTitle(title?: string){
    if (title){
      this.titleService.setTitle(`Fair PharmaCare | ${title}`);
    }
    else {
      // Default title
      this.titleService.setTitle(this.title);
    }
  }

  /**
   * Enables the confirm on exit/there are unsaved changes prompt when
   * navigating away or reloading the page. Has only been tested for FF/Chrome,
   * need to test for IE.
   *
   * Note: Due to browser security policies we are unable to control the
   * displayed text. Additionally, the prompt will not work if user has disabled
   * them in browser settings or has not yet interacted with the page.
   */
  enablePromptOnExit(){
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  /**
   * Removes the confirm on exit prompt.  It is safe to call this function even
   * if `enablePromptOnExit()` has not been called.
   */
  disablePromptOnExit(){
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload(event){
    event.preventDefault(); // Most browsers, including FF
    event.returnValue = ''; // Chrome/Chromium based browsers still need this one.
  }

  /**
   * Checks if user is inactive, and if so, purges data by refreshing the page.
   */
  enablePurgeWhenInactive(){
    // Configurable constants
    const hour = 1000 * 60 * 60; //ms
    const timeLimit = hour * 3;
    let timeout;

    /** Purge local state by refreshing. */
    const purge = () => {
      console.log('You are inactive, so we are purging all data by refreshing the page.');
      // Remove the promptOnExit prompt, or it'll stop the refresh.
      this.disablePromptOnExit();
      window.location.reload();
    };


    /** A simple debounce. Detect if user is inactive, then calls purge() */
    const checkInactive = (event) => {
      clearTimeout(timeout);
      timeout = setTimeout(purge, timeLimit);
    };

    // Finally, wire it up by attaching the event listener to mousemove and
    // keypress. This covers screenreaders, as they simulate a keyboard.
    window.addEventListener('mousemove', checkInactive);
    window.addEventListener('keypress', checkInactive);

  }
}
