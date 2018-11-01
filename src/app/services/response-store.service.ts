import { Injectable } from '@angular/core';
import {
  StatusCheckPHNPayload,
  StatusCheckRegNumberPayload,
  ReprintLetterPayload,
  EligibilityPayload,
  RegistrationPayload,
  ServerPayload,
  MessageInterface,
  RegStatusCode
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

  // When wording changes in database table PLIADMIN.PLI_MESSAGE this will need to be updated.
  private _hardCodeMsg: MessageInterface[] = [
    { msgCode: 'SRQ_026',
      msgText: 'SRQ_026 - Cache needs to be implemented',
      msgType: RegStatusCode.ERROR}, // TODO: to removed once cache is implemented
    { msgCode: 'SRQ_029',
      msgText: 'SRQ_029 - Cache needs to be implemented',
      msgType: RegStatusCode.ERROR}, // TODO: to removed once cache is implemented
    { msgCode: 'SRQ_048',
      msgText: 'SRQ_048 - Cache needs to be implemented',
      msgType: RegStatusCode.ERROR}, // TODO: to removed once cache is implemented

    { msgCode: 'SRQ_045',
      msgText: 'The Fair PharmaCare registration system is temporarily unavailable due to system maintenance.<br/> \n' +
      'Please try again later.',
      msgType: RegStatusCode.WARNING},
    { msgCode: 'SRQ_099',
      msgText: 'This error occurred because the system encountered an unanticipated situation which forced it to stop',
      msgType: RegStatusCode.ERROR}
  ];
  public cacheMsgs: MessageInterface[];

  constructor() { }

  private _statusCheckRegNumber: StatusCheckRegNumberPayload;
  private _statusCheckPHN: StatusCheckPHNPayload;

  public  internalResponse: ServerPayload;
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

    if ( this.cacheMsgs ) {
      return this.cacheMsgs.find(val => val.msgCode === msgCode);
    }

    // hard-coded messages
    return this._hardCodeMsg.find( val => val.msgCode === msgCode );
  }
}
