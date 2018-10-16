import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {mergeMap, delay} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Injectable} from '@angular/core';
import {
  BenefitYearPayload,
  DeductiblePayload,
  EligibilityPayload,
  RegistrationPayload,
  RegStatusCode, StatusCheckPHNPayload, StatusCheckRegNumberPayload
} from '../models/api.model';
import {baselineAssist, pre1939Assist} from '../modules/financial-calculator/assistenceLevelsTestData';
import {FakeBackendService} from './fake-backend.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor  {

  constructor(private fakebackendService: FakeBackendService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      console.log( 'Request (fakeBackend interceptor)', request );

      if ( 'POST' === request.method ) {
        let payload = null;

        if (request.url.endsWith('/getCalendar')) {
          console.log('Get Calendar - fake backend');
          payload = new BenefitYearPayload({
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: '2019',
            taxYear: '2017',
            regStatusCode: RegStatusCode.SUCCESS,
            regStatusMsg: ''
          });
        } else if (request.url.endsWith('/getDeductibles')) {
          console.log('Get Deductibles - fake backend');
          payload = new DeductiblePayload({
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: request.body.benefitYear,
            assistanceLevels: baselineAssist,
            pre1939AssistanceLevels: pre1939Assist,
            regStatusCode: RegStatusCode.SUCCESS,
            regStatusMsg: ''
          });
        } else if (request.url.endsWith('/statusCheckFamNumber')) {
          console.log('Status Check (Family Number) - fake backend');

          const registered = this.fakebackendService.hasFamNumber( request.body.famNumber );

          payload = new StatusCheckRegNumberPayload( {
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: request.body.benefitYear,
            famNumber: request.body.famNumber,
            regStatusCode: (registered ? RegStatusCode.SUCCESS : RegStatusCode.ERROR),
            regStatusMsg: (registered ? 'Registered with some status' : 'Not registered')
          });

        } else if (request.url.endsWith('/statusCheckPhn')) {
          console.log('Status Check (PHN) - fake backend');

          const registered = this.fakebackendService.isRegistered( request.body.phn );

          payload = new StatusCheckPHNPayload( {
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: request.body.benefitYear,
            phn: request.body.phn,
            dateOfBirth: request.body.dateOfBirth,
            postalCode: request.body.postalCode,
            regStatusCode: (registered ? RegStatusCode.SUCCESS : RegStatusCode.ERROR),
            regStatusMsg: (registered ? 'Registered with some status' : 'Not registered')
          });

        } else if ( request.url.endsWith('/checkEligibility') ) {

          console.log( 'Check Eligibility - fake backend' );

          let family;
          let eligible = false;
          const alreadyRegistered = this.fakebackendService.isRegistered(
              request.body.persons.map( x => x.phn )
          );

          if ( !alreadyRegistered ) {
            family = this.fakebackendService.getFamily(
                request.body.persons.map(x => x.phn)
            );

            if ( family ) {
              eligible = this.fakebackendService.parentDobMatch( request.body.persons, family );
            }
          }

          payload = new EligibilityPayload( {
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: request.body.benefitYear,
            regStatusMsg: 'Fake backend - ' +
            ( alreadyRegistered ? 'Already registered' :
                ( family ? ( eligible ? 'Success' : 'DOBs do not match' ) : 'Not eligible' ) ),
            regStatusCode: ( alreadyRegistered ? RegStatusCode.SUCCESS :
                ( family && eligible ? RegStatusCode.CONTINUE_REG : RegStatusCode.ERROR ) ),
            persons: ( family ? family : '' )
          });
        } else if (request.url.endsWith('/requestRegistration') ) {
          console.log( 'Request Registration - fake backend' );

          const family = request.body.persons;
          console.log( 'family: ', family );
/*
          payload = new RegistrationPayload( {
            uuid: request.body.uuid,
            processDate: request.body.processDate,
            clientName: request.body.clientName,
            benefitYear: request.body.benefitYear,
            taxYear: request.body.taxYear,
            familyNumber: this.fakebackendService.generateFpcNumber(), */

           // deductibleAmounText: string;
           // annualMaximumAmountText: string;
           // copayPercentageText: string;

      /*      regStatusCode: RegStatusCode.SUCCESS,
            regStatusMsg: 'Success'
          });*/
        }

        if ( payload ) {
          return of(new HttpResponse({ status: 200, body: payload }))
            .pipe(delay(1000));
        }

        // Pass through to actual service
        return next.handle( request );
      } else {
        // Pass through to actual service
        return next.handle( request );
      }
    }
    ));
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

