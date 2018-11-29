import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorPageService {

  private _errorResponse: string;

  constructor() { }

  set errorResponse( error: string ) {
    console.log( 'Error occurred: ' + error );
    this._errorResponse = error;
  }

  get errorResponse(): string {
    return this._errorResponse;
  }
}
