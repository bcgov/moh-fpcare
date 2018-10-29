import { AbstractHttpService } from './abstract-api-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError, Observable } from 'rxjs';
import { Logger } from './logger.service';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import {
  StatusCheckPHN,
  StatusCheckRegNum,
  DeductibleInterface,
  ReprintLetter, PersonInterface, PayloadInterface, AddressInterface
} from 'app/models/api.model';
import {FPCareDataService} from './fpcare-data.service';
import {EligibilityInterface, RegistrationInterface} from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends AbstractHttpService {

  /**
   *  Default hardcoded header values.  Note: Authentication headers are added
   *  at runtime in the httpOptions() method.
   */
  protected _headers: HttpHeaders = new HttpHeaders();
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
      uuid: this.generateUUID(),
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
      uuid: this.generateUUID(),
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
      uuid: this.generateUUID(),
      clientName: this._clientName,
      processDate: processDate,
      phn: input.phn,
      postalCode: input.postalCode,
      dateOfBirth: input.dob,
      letterType: input.letterType
    });
  }

  public getDeductibles( processDate = this.getProcessDate() ) {
    const url = environment.baseAPIUrl + 'getDeductibles';

    return this.post<DeductibleInterface>(url, {
      uuid: this.generateUUID(),
      clientName: this._clientName,
      processDate: processDate
    });
  }

  public checkEligibility( input: {persons: PersonInterface[]}
                       , processDate = this.getProcessDate() ) {
    const url = environment.baseAPIUrl + 'checkEligibility';

    return this.post<EligibilityInterface>(url, {
      uuid: this.generateUUID(),
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
        uuid: this.generateUUID(),
        clientName: this._clientName,
        processDate: processDate,
        persons: input.persons,
        address: input.address
      });
    }

    return this.post<RegistrationInterface>(url, {
      uuid: this.generateUUID(),
      clientName: this._clientName,
      processDate: processDate,
      persons: input.persons
    });
  }

  protected handleError(error: HttpErrorResponse) {
    console.log( 'Error handleError: ', error );

    if (error.error instanceof ErrorEvent) {
      //Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
    }

    this.logService.logHttpError(error);

    // A user facing erorr message /could/ go here; we shouldn't log dev info through the throwError observable
    return throwError('Something went wrong with the network request.');
  }

  private generateUUID(): string {
    return UUID.UUID().toString();
  }

  /**
   * Returns current date in YYYYMMDD, e.g. '20180801'
   */
  private getProcessDate(): string {
    return moment().format('YYYYMMDD');
  }
}
