import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs/internal/observable/throwError';
import {BenefitYearPayload, DeductiblePayload, EligibilityPayload, RegStatusCode} from '../models/api.model';
import {baselineAssist, pre1939Assist} from '../modules/financial-calculator/assistenceLevelsTestData';
import {FakeBackendService} from './fake-backend.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor  {

  constructor(private fakebackendService: FakeBackendService ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      if ( 'POST' === request.method ) {
        let payload = null;

        if ( request.url.endsWith('/getCalendar') ) {
          console.log( 'Get Calendar - fake backend' );
          payload = new BenefitYearPayload({
            benefitYear: '2019',
            taxYear: '2017',
            regStatusCode: RegStatusCode.SUCCESS,
            regStatusMsg: '',
            uuid: request.body.uuid
          });
        } else if ( request.url.endsWith('/getDeductibles') ) {
          console.log( 'Get Deductibles - fake backend' );
          payload = new DeductiblePayload( {
            regStatusMsg: '',
            regStatusCode: RegStatusCode.SUCCESS,
            benefitYear: request.body.benefitYear,
            uuid: request.body.uuid,
            assistanceLevels: baselineAssist,
            pre1939AssistanceLevels: pre1939Assist
          });
        } else if ( request.url.endsWith('/checkEligibility') ) {

          console.log( 'Check Eligibility - fake backend' );

          const family = this.fakebackendService.getFamily(
            request.body.persons.map( x => x.phn )
          );

          payload = new EligibilityPayload( {
            uuid: request.body.uuid,
            benefitYear: request.body.benefitYear,
            regStatusMsg: 'This is a test message from fake backend.',
            regStatusCode: (family ? RegStatusCode.SUCCESS : RegStatusCode.ERROR),
            persons: family
          });
        }

        if ( payload ) {
          return of(new HttpResponse({ status: 200, body: payload }));
        }

        // else return 400 bad request
        return throwError({ error: { message: 'URL not implemented by fake backend.' } });
      } else {
        // else return 400 bad request
        return throwError({ error: { message: 'Method not supported by fake backend.' } });
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

