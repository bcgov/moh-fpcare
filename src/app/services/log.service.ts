import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AbstractHttpService } from "./abstract-api-service";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService extends AbstractHttpService {
  protected headers: HttpHeaders = new HttpHeaders({ test: '123fpclog' });

  constructor(protected http: HttpClient) {
    super(http);
  }

  public log(message) {
    const body = { message: message };
    // Add more info to body as required here!
    const url = environment.loggingURL;
    return this.post(url, body);
  }

  public logError(error: HttpErrorResponse) {
    return this.log({
      message: error.message,
      error: error.error
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

    return throwError(error);
  }
}