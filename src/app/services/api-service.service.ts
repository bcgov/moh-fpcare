import { AbstractHttpService } from './abstract-api-service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError, Observable } from 'rxjs';
import { LogService } from './log.service';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { BenefitYearPayload } from 'app/models/api.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService extends AbstractHttpService {

  /**
   *  Default hardcoded header values.  Note: Authentication headers are added
   *  at runtime in the httpOptions() method.
   */
  protected _headers: HttpHeaders = new HttpHeaders({angular: 'FPC-API-Service'});
  private _token: string;
  private _clientName: string = 'ppiwebuser';

  constructor(protected http: HttpClient, public logService: LogService){
    super(http);
  }

  // TODO! TYPE API RESPONSES! Work is above.
  // public getBenefitYear(processDate = this.getProcessDate()): Observable<HttpResponse<BenefitYearPayload>> {
  public getBenefitYear(processDate = this.getProcessDate()) {
    const url = environment.baseAPIUrl + 'getCalendar';

    return this.post<BenefitYearPayload>(url, {
      uuid: this.generateUUID(),
      clientName: this._clientName,
      processDate: processDate,
    });
  }

  public setCaptchaToken(token: string){
    this._token = token;
    this._headers = this._headers.append('X-Authorization', `Bearer ${this._token}`);
    console.log('ApiService token set:', {
      token: this._token,
      headers: this._headers,
    });

  }

  /**
   * Request application registration status using the FPC Registration Number
   * @param {string} regNumber
   * @param {number} benefitYear
   * @returns {Observable<HttpResponse>}
   */
  public statusCheckFamNumber( input: { regNumber: string, benefitYear: string } ) {
    const url = environment.baseAPIUrl + 'statusCheckFamNumber';

    return this.post(url, {
      uuid: this.generateUUID(),
      clientName: this._clientName,
      benefitYear: input.benefitYear,
      famNumber: input.regNumber
    });
  }

  /**
   * Request application registration status using the Personal Health Number, Date of birth, and postal code
   * @param {string} phn
   * @param {string} dob
   * @param {string} postalCode
   * @param {number} benefitYear
   * @returns {Observable<HttpResponse>}
   */
  // public statusCheckPHN( phn: string, dob: string, postalCode: string, benefitYear: number ) {
  // TODO TODO TODO: UPDATE JSDOCS
  public statusCheckPHN( input: {phn: string, dob: string, postalCode: string, benefitYear: string} ) {
    const url = environment.baseAPIUrl + 'statusCheckPhn';

    return this.post(url, {
      uuid: this.generateUUID(),
      clientName: this._clientName,
      benefitYear: input.benefitYear,
      phn: input.phn,
      postalCode: input.postalCode,
      dateOfBirth: input.dob
    });
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
    }

    // this.logService.logError(error);

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
