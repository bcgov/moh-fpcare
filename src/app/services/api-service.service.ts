import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
// import { environment } from ''

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /** Base API URL, loaded via angular environment variables when the service is initialized. */
  protected baseAPIUrl: string;

  constructor(private http: HttpClient) { 
    this.baseAPIUrl = environment.baseAPIUrl;
  }

  // private get(){}

  protected get headers(): Headers {
    // return new Headers({token: token});
    return;
  }

  public getBenefitYear(){
    const url = this.baseAPIUrl + 'users/';
    // Final URL is below, but we would call a different URL as we're calling a service which is setup with certs.
    // URL: https://d2fpcaresvc.maximusbc.ca/fpcareIntegration/rest/getBenefitYear
    return this.http.get(url);
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      //Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
    }

    // TODO: LOG THE ERROR TO LOG SERVICE!

    // A user facing erorr message /could/ go here; we shouldn't log dev info through the throwError observable
    return throwError('Something went wrong with the network request.');
  }
}
