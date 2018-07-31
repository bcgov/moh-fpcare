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

  protected headers: HttpHeaders = new HttpHeaders({test: '123fpclog'});

  constructor(protected http: HttpClient, public logService: LogService){
    super(http);
  }

  public getBenefitYear(){
    // Final URL is below, but we would call a different URL as we're calling a service which is setup with certs.
    // URL: https://d2fpcaresvc.maximusbc.ca/fpcareIntegration/rest/getBenefitYear
    const url = environment.baseAPIUrl + 'getCalendar/';

    // return this.http.get(url); // MINIMUM TESTABLE VERSION
    return this.post(url, {
      uuid: '1234563434',
      clientName: 'ppiwebuser',
      benefitYear: '2018',
      processDate: '20180720',
      taxYear: '2018',
      regStatusCode: ' ',
      regStatusMsg: ' ',
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