import { Injectable } from '@angular/core';
import {
  StatusCheckPHNPayload,
  StatusCheckRegNumberPayload,
  ReprintLetterPayload,
  EligibilityPayload,
  RegistrationPayload,
  ServerPayload,
  MessageInterface,
  RegStatusCode,
  SRQ_Msgs
} from '../models/api.model';

/**
 * ResponseStore is responsible for storing HTTP responses from the API.  Use
 * getters and setters to purge other requests as required.
 *
 * @export
 * @class ResponseStoreService
 */
@Injectable({
  providedIn: 'root'
})
export class ResponseStoreService {

  public cacheMsgs: MessageInterface[];

  constructor() { }

  private _statusCheckRegNumber: StatusCheckRegNumberPayload;
  private _statusCheckPHN: StatusCheckPHNPayload;

  public internalResponse: ServerPayload;
  public reprintLetter: ReprintLetterPayload;
  public eligibility: EligibilityPayload;
  public registration: RegistrationPayload;

  /**
   * Returns the response for a Reg Num Status Check request. Note: A PHN Status
   * Request and a Reg Number Status Request cannot exist at the same time, one
   * will be purged.
   */
  get statusCheckRegNumber(): StatusCheckRegNumberPayload { return this._statusCheckRegNumber; }

  set statusCheckRegNumber(val: StatusCheckRegNumberPayload){
    this._statusCheckRegNumber = val;
    this._statusCheckPHN = null;
  }

  /**
   * Returns the response for a PHN Status Check request. Note: A PHN Status
   * Request and a Reg Number Status Request cannot exist at the same time, one
   * will be purged.
   */
  get statusCheckPHN(): StatusCheckPHNPayload { return this._statusCheckPHN; }

  set statusCheckPHN(val: StatusCheckPHNPayload){
    this._statusCheckPHN = val;
    this._statusCheckRegNumber = null;
  }

  /**
   * Set internal response to be displayed on result pages
   * @param {string} msgCode
   */
  set internalError( msgCode: string ) {

    const errMsg = this.findMessage( msgCode );

    console.log( 'Internal Error: ', errMsg );

    this.internalResponse = new ServerPayload({
      regStatusCode: RegStatusCode[errMsg.msgCode],
      regStatusMsg: errMsg.msgText,
      uuid: ''
    });
  }

  /**
   * Find message based on msgCode
   * @param {string} msgCode
   * @returns {MessageInterface}
   */
  private findMessage( msgCode: string ): MessageInterface {

    let msg: MessageInterface;

    if ( this.cacheMsgs ) {
      msg = this.cacheMsgs.find(val => val.msgCode === msgCode);
    }

    // If no message found, return error 99
    return ( msg ? msg : SRQ_Msgs.find( val => val.msgCode === 'SRQ_099' ) );
  }
}
