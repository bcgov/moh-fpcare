import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { HttpResponse } from 'selenium-webdriver/http';


export abstract class AbstractHttpService {

  constructor(protected http: HttpClient) { }

  /** The headers to send along with every GET and POST. */
  protected abstract _headers: HttpHeaders;

  /**
   * Makes a GET request to the specified URL, using headers and HTTP options specified in their respective methods.
   * @param url Target URL to make the GET request
   */
  protected get(url) {
    /** The HTTP request observer with always on error handling */
    const observable = this.http.get(url, this.httpOptions);
    return this.setupRequest(observable);
  }

  //toDO - SETtle on one, testing for now
  protected post<T>(url, body): Observable<T> {
  // protected post<T>(url, body): Observable<HttpResponse<T>> {
    const observable = this.http.post(url, body, this.httpOptions);
    // this.http.post
    return this.setupRequest(observable);
  }

  // TODO - Re-add typing!
  // protected setupRequest(observable: Observable<HttpResponse>): Observable<HttpResponse> {
    protected setupRequest(observable ){
    // All failed requests should trigger the abstract method handleError
    observable = observable.pipe(catchError(this.handleError));
    // Optionally add console logging
    if (environment.logHTTPRequestsToConsole) {
      observable = observable.pipe(tap(
        data => console.log('HTTP Success: ', data),
        error => console.log('HTTP Error: ', error)
      ));
    }
    return observable;
  }

  /** The HttpOptions object that Angular takes for GET and POST requests. Used in every HTTP request from this service. */
  protected get httpOptions() {
    return {
      headers: this._headers
    };
  }

  /** Handles all failed requests that throw either a server error (400/500) or a client error (e.g. lost internet). */
  protected abstract handleError(error: HttpErrorResponse);
}
