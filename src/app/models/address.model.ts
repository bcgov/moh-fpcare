import { Address } from 'moh-common-lib/models';

export class FPCAddress extends Address {

  /**
   * Only exists for addresses which were created by the GeoCoder Input, this is
   * the fullAddress string the geocoder returns.
   */
  public _geocoderFullAddress: string;

  /**
   * Check if the address has a completed valid postal.  This works around
   * text-masking. Assumes postals still follow the text-mask format of V1V 1V1.
   */
  hasPostal(): boolean {
    if (!this.postal) return false;
    const postal = this.postal.replace(/_/g, ''); //Remove underscores from text-masking
    return postal.length === 7;
  }
}




