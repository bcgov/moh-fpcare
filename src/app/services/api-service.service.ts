import { AbstractHttpService } from './abstract-api-service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { LogService } from './log.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends AbstractHttpService {

  /**
   *  Default hardcoded header values.  Note: Authentication headers are added
   *  at runtime in the httpOptions() method.
   */
  protected headers: HttpHeaders = new HttpHeaders({angular: 'FPC-API-Service'});
  private token: string;

  constructor(protected http: HttpClient, public logService: LogService){
    super(http);
  }

  public getBenefitYear(){
    const url = environment.baseAPIUrl + 'fpcareIntegration/rest/getCalendar';

    return this.post(url, {
      uuid: '1234876',
      clientName: 'ppiwebuser',
      processDate: '20180720', // Necesssary param. Need to figure out how to generate, and WHY.
    });
  }

  public setCaptchaToken(token: string){
    this.token = token;
    this.headers = this.headers.append('X-Authorization', `Bearer ${this.token}`);
    console.log('ApiService token set:', {
      token: this.token,
      headers: this.headers,
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

}