import { AbstractHttpService } from 'moh-common-lib/services';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError, Observable } from 'rxjs';
import { Logger } from './logger.service';
import * as moment from 'moment';
import {
  StatusCheckPHN,
  StatusCheckRegNum,
  DeductibleInterface,
  ReprintLetter,
  PersonInterface,
  AddressInterface,
  EligibilityInterface,
  RegistrationInterface, MessagePayloadInterface, SRQ_Msgs
} from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends AbstractHttpService {

  /**
   *  Default hardcoded header values.  Note: Authentication headers are added
   *  at runtime in the httpOptions() method.
   */
  protected _headers: HttpHeaders = new HttpHeaders({
    'Cache-Control' : 'private'
  });
  private _token: string;
  private _clientName: string = 'ppiweb';

  constructor( protected http: HttpClient, public logService: Logger ){
    super(http);
  }

  public setCaptchaToken(token: string){
    this._token = token;
    this._headers = this._headers.set('X-Authorization', `Bearer ${this._token}`);

    if (!environment.production) {
      console.log('ApiService token set:', {
        token: this._token,
        headers: this._headers
      });
    }
  }

  /**
   * Request application registration status using the FPC Registration Number
   *
   * @param {{regNumber: string, benefitYear: string}} input
   * @param processDate
   * @returns {Observable<StatusCheckRegNum>}
   */
  public statusCheckFamNumber( input: { regNumber: string },
                               processDate = this.getProcessDate() ): Observable<StatusCheckRegNum> {
    const url = environment.baseAPIUrl + 'statusCheckFamNumber';

    return this.post<StatusCheckRegNum>(url, {
      uuid: this.logService.getApplicationID(),
      clientName: this._clientName,
      processDate: processDate,
      famNumber: input.regNumber
    });
  }

  /**
   * Request application registration status using the Personal Health Number,
   * Date of birth, and postal code
   *
   * @param {{phn: string, dob: string, postalCode: string, benefitYear: string}} input
   * @param processDate
   * @returns {Observable<StatusCheckPHN>}
   */
  public statusCheckPHN( input: {phn: string, dob: string, postalCode: string},
                         processDate = this.getProcessDate() ): Observable<StatusCheckPHN> {
    const url = environment.baseAPIUrl + 'statusCheckPhn';

    return this.post<StatusCheckPHN>(url, {
      uuid: this.logService.getApplicationID(),
      clientName: this._clientName,
      processDate: processDate,
      phn: input.phn,
      postalCode: input.postalCode,
      dateOfBirth: input.dob
    });
  }

  /**
   * Request reprint of letter (consent or COB) using the Personal Health Number, Date of birth, and postal code
   *
   * @param {{phn: string, dob: string, postalCode: string, benefitYear: string, letterType: number}} input
   * @returns {Observable<StatusCheckPHN>}
   */
  public reprintLetter( input: {phn: string, dob: string, postalCode: string, letterType: string},
                        processDate = this.getProcessDate() ): Observable<StatusCheckPHN> {
    const url = environment.baseAPIUrl + 'requestLetter';

    return this.post<ReprintLetter>(url, {
      uuid: this.logService.getApplicationID(),
      clientName: this._clientName,
      processDate: processDate,
      phn: input.phn,
      postalCode: input.postalCode,
      dateOfBirth: input.dob,
      letterType: input.letterType
    });
  }

  /**
   * Get request to retreive deductibles
   * @returns {Observable<DeductibleInterface>}
   */
  public getDeductibles() {
    const url = environment.baseAPIUrl + 'getDeductibles';

    const queryParams = new HttpParams();
    return this.get<DeductibleInterface>(url, queryParams);
  }

  public checkEligibility( input: {persons: PersonInterface[]}
                       , processDate = this.getProcessDate() ) {
    const url = environment.baseAPIUrl + 'checkEligibility';

    return this.post<EligibilityInterface>(url, {
      uuid: this.logService.getApplicationID(),
      clientName: this._clientName,
      processDate: processDate,
      persons: input.persons
    });
  }

  public requestRegistration(
      input: { persons: PersonInterface[], address: AddressInterface }, processDate = this.getProcessDate() ) {

    const url = environment.baseAPIUrl + 'requestRegistration';

    if ( input.address ) {

      // Address was updated
      return this.post<RegistrationInterface>(url, {
        uuid: this.logService.getApplicationID(),
        clientName: this._clientName,
        processDate: processDate,
        persons: input.persons,
        address: input.address
      });
    }

    return this.post<RegistrationInterface>(url, {
      uuid: this.logService.getApplicationID(),
      clientName: this._clientName,
      processDate: processDate,
      persons: input.persons
    });
  }

  /**
   * Get request to retreive front-end error messsage
   * @returns {Observable<StatusMsgsInterface>}
   */
  public getMessages() {
    const url = environment.baseAPIUrl + 'loadMessages';

    return this.get<MessagePayloadInterface>(url);
  }

  protected handleError(error: HttpErrorResponse) {
    // SRQ_099 for all network errors not related to unauthorized request
    let errMsg = SRQ_Msgs.find( val => val.msgCode === 'SRQ_099' ).msgText;

    console.log( 'Error handleError: ', error );

    if (error.error instanceof ErrorEvent) {
      //Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);

      // Unauthorized - assume the captcha token has expired
      if ( 401 === error.status ) {
        errMsg = SRQ_Msgs.find( val => val.msgCode === 'SRQ_058' ).msgText;
      }
    }

    this.logService.logHttpError(error);

    // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
    return throwError( errMsg );
  }

  /**
   * Returns current date in YYYYMMDD, e.g. '20180801'
   */
  private getProcessDate(): string {
    return moment().format('YYYYMMDD');
  }
}
