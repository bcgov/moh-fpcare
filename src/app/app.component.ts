import { Component, OnInit } from '@angular/core';
import {DummyDataService, TestScenario} from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';
import {environment} from 'environments/environment';
import * as version from '../VERSION.generated';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Logger } from './services/logger.service';
import { SplashPageService } from './modules/splash-page/splash-page.service';
import {ApiService} from './services/api-service.service';
import {MessagePayload} from './models/api.model';
import {REGISTRATION_PATH, REGISTRATION_RESULTS} from './models/route-paths.constants';
import {ResponseStoreService} from './services/response-store.service';


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
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private logger: Logger,
              public splash: SplashPageService,
              public apiService: ApiService,
              private responseStore: ResponseStoreService) {
  }

  ngOnInit() {

    if (!environment.bypassSplashPage){
      this.splash.setup();
    }

    // Testers have asked for Version to be logged with every build.
    if (version.success){
      console.log('%c' + version.message, 'color: #036; font-size: 20px;');
    }
    else {
      console.error(version.message);
    }

    this.updateTitleOnRouteChange();

    // Load messages from cache
    this.apiService.getMessages().subscribe(
        (response) => {

          const payload = new MessagePayload( response );

          if ( payload.success ) {
            this.responseStore.cacheMsgs = payload.messages;
          } else {
            this.router.navigate([REGISTRATION_PATH + '/' + REGISTRATION_RESULTS] );
          }
        }
    );

    // Debugging purposes - MD5 hashing
    //(window as any).md5 = Md5;

    if ( environment.useDummyData ) {

      // Purpose: Development
      // this.registerSingleApplicant( TestScenario.EligNotReg );
      //this.registrationBornBefore1939();
      this.registerfamily();
      //this.statusCheckApplicant( TestScenario.Reg );
      //this.statusCheckApplicant( TestScenario.Reg, false );


      // Applicant
      //this.fpcareDataService.applicant = this.dummyDataService.createApplicant();

      // Spouse
      //this.fpcareDataService.hasSpouse = true;
      //this.fpcareDataService.spouse = this.dummyDataService.createSpouse();

      // Children
      //this.fpcareDataService.dependants = this.dummyDataService.createChildren( 2 );

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


  // Test Case Data

  /**
   * Applicant is either eligible and not registered, registered, or not eligible
   * @param {TestScenario} testScenario
   */
  registerSingleApplicant( testScenario: TestScenario ): void {

    const phn = (testScenario === TestScenario.EligNotReg ? '9999999973' :
        (testScenario === TestScenario.Reg ? '9999999181' : '9999999142' ) );

      this.fpcareDataService.applicant = this.dummyDataService.createPerson(phn, {
        year: 1965,
        month: 4,
        day: 30
      }, 'V3V2V1');


    /* $1400 deductible, $1875 family max */
    this.fpcareDataService.applicantIncome = this.dummyDataService.generateRandomNumber( 45000.01, 48333.00 );
    this.fpcareDataService.bornBefore1939 = false;

    // No spouse
    this.fpcareDataService.hasSpouse = false;
  }

  /**
   * Applicant is either registered or not registered
   * @param {TestScenario} testScenario
   */
  statusCheckApplicant( testScenario: TestScenario, usePhn: boolean = true ): void {
    const phn =  (testScenario === TestScenario.Reg ? '9999999181' : '9999999142');
    const famNumber = (testScenario === TestScenario.Reg ? 'A99999991' : 'A88888880');

    if (usePhn) {
      this.fpcareDataService.applicant = this.dummyDataService.createPersonforStatusCheck( phn,
          {year: 1990, month: 9, day: 30}, 'V9E4R1');
    } else {
      this.fpcareDataService.applicant = this.dummyDataService.createPersonforStatusCheck( famNumber );
    }
  }

  registrationBornBefore1939(): void {

    // applicant
    this.fpcareDataService.applicant = this.dummyDataService.createPerson('9999999207', {
      year: 1941,
      month: 5,
      day: 20
    });
    this.fpcareDataService.applicantIncome = this.dummyDataService.generateRandomNumber( 3000.01, 5000.00 );


    // spouse
    this.fpcareDataService.addSpouse();
    this.fpcareDataService.hasSpouse = true;
    this.fpcareDataService.spouse = this.dummyDataService.createPerson('9999999214', {
      year: 1938,
      month: 11,
      day: 1
    });
    this.fpcareDataService.spouseIncome = this.dummyDataService.generateRandomNumber( 0, 3000.00 );

    this.fpcareDataService.bornBefore1939 = true;
  }

  registerfamily(): void {

    // Applicant
    this.fpcareDataService.applicant = this.dummyDataService.createPerson('9999999934', {
      year: 1980,
      month: 2,
      day: 29
    });
    this.fpcareDataService.applicantIncome = this.dummyDataService.generateRandomNumber( 51667.01, 55000.00 );
    this.fpcareDataService.disabilityAmount = this.dummyDataService.generateRandomNumber( 0, 500 );

    // Spouse
    this.fpcareDataService.hasSpouse = true;
    this.fpcareDataService.addSpouse();
    this.fpcareDataService.spouse = this.dummyDataService.createPerson('9999999941', {
      year: 1983,
      month: 1,
      day: 31
    });
    this.fpcareDataService.spouseIncome = this.dummyDataService.generateRandomNumber( 45000.01, 48333.00 );
    this.fpcareDataService.spouseDisabilityAmount = this.dummyDataService.generateRandomNumber( 0, 1000 );

    this.fpcareDataService.bornBefore1939 = false;

    // Children
    this.fpcareDataService.addChild();
    this.fpcareDataService.dependants[0] = this.dummyDataService.createPerson('9999999959', {
      year: 2005,
      month: 3,
      day: 17
    }, 'V2V2V4');

    this.fpcareDataService.addChild();
    this.fpcareDataService.dependants[1] = this.dummyDataService.createPerson('9999999966', {
      year: 2009,
      month: 12,
      day: 31
    }, 'V2V2V4');
  }
}
