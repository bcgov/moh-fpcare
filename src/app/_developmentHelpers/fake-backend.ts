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
  BenefitYearInterface,
  DeductibleInterface,
  DependentMandatory,
  EligibilityInterface,
  RegistrationInterface,
  RegStatusCode,
  StatusCheckPHN,
  StatusCheckRegNum,
} from '../models/api.model';
import {FakeBackendService, FpcareAssistLevel} from './fake-backend.service';
import {baselineAssist, pre1939Assist} from '../modules/financial-calculator/assistenceLevelsTestData';

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
          payload = this.getCalendarResponse( request );

        } else if (request.url.endsWith('/getDeductibles')) {

          console.log('Get Deductibles - fake backend');
          payload = this.getDeductibleResponse( request );

        } else if (request.url.endsWith('/statusCheckFamNumber')) {

          console.log('Status Check (Family Number) - fake backend');
          payload =  this.getCheckStatusFamNumResponse( request );

        } else if (request.url.endsWith('/statusCheckPhn')) {

          console.log('Status Check (PHN) - fake backend');
          payload = this.getCheckStatusPhnResponse( request );

        } else if (request.url.endsWith('/checkEligibility')) {

          console.log( 'Check Eligibility - fake backend' );
          // status codes subject to change and new field added for mandatory children
          payload = this.getEligibilityResponse( request );

        } else if (request.url.endsWith('/requestRegistration') ) {

          console.log( 'Request Registration - fake backend' );
          payload = this.getRegistrationResponse( request );

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

  // Response methods
  private getCalendarResponse( request: HttpRequest<any> ): BenefitYearInterface {

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: '2019',
      taxYear: '2017',
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: ''
    };
  }


  private getDeductibleResponse( request: HttpRequest<any> ): DeductibleInterface {

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: request.body.benefitYear,
      assistanceLevels: baselineAssist,
      pre1939AssistanceLevels: pre1939Assist,
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: ''
    };
  }

  private getCheckStatusFamNumResponse( request: HttpRequest<any> ): StatusCheckRegNum {

    const registered = this.fakebackendService.hasFamNumber( request.body.famNumber );

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: request.body.benefitYear,
      famNumber: request.body.famNumber,
      regStatusCode: (registered ? RegStatusCode.SUCCESS : RegStatusCode.ERROR),
      regStatusMsg: (registered ? 'Registered with some status' : 'Not registered')
    };
  }

  private getCheckStatusPhnResponse( request: HttpRequest<any> ): StatusCheckPHN {

    const registered = this.fakebackendService.isRegistered( request.body.phn );

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: request.body.benefitYear,
      phn: request.body.phn,
      dateOfBirth: request.body.dateOfBirth,
      postalCode: request.body.postalCode,
      regStatusCode: (registered ? RegStatusCode.SUCCESS : RegStatusCode.ERROR),
      regStatusMsg: (registered ? 'Registered with some status' : 'Not registered')
    };
  }

  private getEligibilityResponse( request: HttpRequest<any> ): EligibilityInterface {

    let family;
    let eligible = false;
    const alreadyRegistered = this.fakebackendService.isRegistered(
        request.body.persons.map( x => x.phn )
    );

    if ( !alreadyRegistered ) {
      family = this.fakebackendService.getFamily(
          request.body.persons.map(x => x.phn)
      );

      if (family) {
        eligible = this.fakebackendService.parentDobMatch(request.body.persons, family);
      }
    }

    // status codes subject to change and new field added for mandatory children
    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: request.body.benefitYear,
      persons: ( family ? family : '' ),
      dependentMandatory: DependentMandatory.NO,
      regStatusMsg: 'Fake backend - ' + ( alreadyRegistered ? 'Already registered' :
          ( family ? ( eligible ? 'Success' : 'DOBs do not match' ) : 'Not eligible' ) ),
      regStatusCode: ( alreadyRegistered ? RegStatusCode.WARNING :
          ( family && eligible ? RegStatusCode.SUCCESS : RegStatusCode.ERROR ) )
    };
  }

  private getRegistrationResponse( request: HttpRequest<any> ): RegistrationInterface {

    const assistLevel: FpcareAssistLevel = this.fakebackendService.getFamilyAssistenceLevel( request.body.persons );

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      benefitYear: request.body.benefitYear,
      taxYear: request.body.taxYear,
      familyNumber: this.fakebackendService.generateFpcNumber(),
      deductibleAmounText: assistLevel.deductible,
      annualMaximumAmountText: assistLevel.maximum,
      copayPercentageText: assistLevel.pharmaCarePortion,
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: 'Success'
    };
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
