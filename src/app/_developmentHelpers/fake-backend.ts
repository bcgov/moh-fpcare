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
  DeductibleInterface,
  DependentMandatory,
  EligibilityInterface,
  MessagePayloadInterface,
  RegistrationInterface,
  RegStatusCode, ReprintLetter,
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

        if (request.url.endsWith('/statusCheckFamNumber')) {

          console.log('Status Check (Family Number) - fake backend');
          payload = this.getCheckStatusFamNumResponse(request);

        } else if (request.url.endsWith('/statusCheckPhn')) {

          console.log('Status Check (PHN) - fake backend');
          payload = this.getCheckStatusPhnResponse(request);

        } else if (request.url.endsWith('/requestLetter')) {

          console.log( 'Letter Reprint - fake backend' );
          payload = this.getReprint( request );

        } else if (request.url.endsWith('/checkEligibility')) {

          console.log( 'Check Eligibility - fake backend' );
          // status codes subject to change and new field added for mandatory children
          payload = this.getEligibilityResponse( request );

        } else if (request.url.endsWith('/requestRegistration')) {

          console.log( 'Request Registration - fake backend' );
          payload = this.getRegistrationResponse( request );

        }

        if ( payload ) {
          return of(new HttpResponse({ status: 200, body: payload }))
            .pipe(delay(1000));
        }

        // Pass through to actual service
        return next.handle( request );
      } else if ( 'GET' === request.method ) {

        if (request.url.endsWith('/loadMessages')) {
          console.log('Get messages - fake backend');
          return of(new HttpResponse({status: 200, body: this.getMessages()}))
              .pipe(delay(1000));

        } else if (request.url.endsWith('/getDeductibles')) {

          console.log('Get Deductibles - fake backend');
          return of(new HttpResponse({status: 200, body: this.getDeductible()}))
              .pipe(delay(1000));

        }
      }

      // Pass through to actual service
      return next.handle( request );
    }
    ));
  }

  private getDeductible(): DeductibleInterface {
    const dt: string = new Date().toDateString();

    return {
      benefitYear: '2019',
      taxYear: '2017',
      assistanceLevels: baselineAssist,
      pre1939AssistanceLevels: pre1939Assist,
      uuid: '123',
      processDate: dt,
      clientName: '',
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: ''
    };
  /*  return {
      benefitYear: '',
      taxYear: '',
      assistanceLevels: [],
      pre1939AssistanceLevels: [],
      uuid: '123',
      processDate: dt,
      clientName: '',
      regStatusCode: RegStatusCode.ERROR,
      regStatusMsg: ''
    };*/
  }

  private getCheckStatusFamNumResponse( request: HttpRequest<any> ): StatusCheckRegNum {

    const registered = this.fakebackendService.hasFamNumber( request.body.famNumber );

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
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
      phn: '',
      dateOfBirth: '',
      postalCode: '',
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
      persons: (family ? family : ''),
      dependentMandatory: DependentMandatory.NO,
      //(this.fakebackendService.hasDependants ? DependentMandatory.YES : DependentMandatory.NO),
      regStatusMsg: 'Fake backend - ' + ( alreadyRegistered ? 'Already registered' :
          ( family ? ( eligible ? 'Eligible for FPCare' : 'DOBs do not match' ) : 'Not eligible' ) ),
      //regStatusMsg: null,
      regStatusCode: ( alreadyRegistered ? RegStatusCode.WARNING :
          ( family && eligible ? RegStatusCode.SUCCESS : RegStatusCode.ERROR ) )
      //regStatusCode: null
    };
  }

  private getRegistrationResponse( request: HttpRequest<any> ): RegistrationInterface {

    const assistLevel: FpcareAssistLevel = this.fakebackendService.getFamilyAssistenceLevel(request.body.persons);

    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      familyNumber: this.fakebackendService.generateFpcNumber(),
      deductibleAmounText: assistLevel.deductible,
      annualMaximumAmountText: assistLevel.maximum,
      copayPercentageText: assistLevel.pharmaCarePortion,
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: 'Success'
    };


  /*return {
       uuid: request.body.uuid,
       processDate: request.body.processDate,
       clientName: request.body.clientName,
       familyNumber: '',
       deductibleAmounText: '',
       annualMaximumAmountText: '',
       copayPercentageText: '',
       regStatusCode: RegStatusCode.ERROR,
       regStatusMsg: 'Failed'
     };*/
  }

  private getMessages(): MessagePayloadInterface {

    const dt: string = new Date().toDateString();
    return {
      uuid: '456',
      processDate: dt,
      clientName: '',
      messages: [
        {msgCode: 'SRQ_026', msgText: 'SRQ_026 (fake-backend)', msgType: RegStatusCode.ERROR},
        {msgCode: 'SRQ_029', msgText: 'SRQ_029 (fake-backend)', msgType: RegStatusCode.ERROR},
        {msgCode: 'SRQ_048', msgText: 'SRQ_048 (fake-backend)', msgType: RegStatusCode.ERROR},
        {msgCode: 'SRQ_045', msgText: 'SRQ_045 (fake-backend)', msgType: RegStatusCode.WARNING},
        {msgCode: 'SRQ_099', msgText: 'SRQ_099 (fake-backend)', msgType: RegStatusCode.ERROR},
      ],
      regStatusCode: RegStatusCode.SUCCESS,
      regStatusMsg: ''
    };
  }

  private getReprint( request: HttpRequest<any> ): ReprintLetter {
    return {
      uuid: request.body.uuid,
      processDate: request.body.processDate,
      clientName: request.body.clientName,
      phn: '',
      dateOfBirth: '',
      postalCode: '',
      letterType: request.body.letterType,
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

