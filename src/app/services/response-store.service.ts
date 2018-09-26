import { Injectable } from '@angular/core';
import {
  StatusCheckPHNPayload,
  StatusCheckRegNumberPayload,
  ReprintLetterPayload,
  EligibilityPayload
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

  constructor() { }

  private _statusCheckRegNumber: StatusCheckRegNumberPayload;
  private _statusCheckPHN: StatusCheckPHNPayload;
  private _reprintLetter: ReprintLetterPayload;
  private _eligibility: EligibilityPayload;

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
   * Returns the response for a Reprint Letter request.
   */
  get reprintLetter(): ReprintLetterPayload { return this._reprintLetter; }

  set reprintLetter(val: ReprintLetterPayload){
    this._reprintLetter = val;
  }

  /**
   * Returns the response for eligibility
   */
  get eligibility(): EligibilityPayload { return this._eligibility; }

  set eligibility( val: EligibilityPayload ) {
    this._eligibility = val;
  }

}
