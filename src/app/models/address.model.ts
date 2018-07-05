import {Base} from './base.alias';
import {isNullOrUndefined} from 'util';


export class Address extends Base {
  /* Variables for class */
  private _street: string;
  private _postal: string;
  private _country: string;
  private _province: string;
  private _city: string;


  /** Overwrite the native JavaScript toString method to determine how the
   * object should be printed, instead of [object Object].  This provides a
   * standard way to print out an address. If you need something specific you
   * should access the properties directly. We omit Province/Country because of
   * PharmaCare's BC focus. */
  toString(){
    return `${this.street}, ${this.city}`;
  }

  /* Setter/Getter functions*/
  get city(): string {
    return !(isNullOrUndefined(this._city)) ? this._city : null;
  }

  set city(value: string) {
    this._city = value;
  }
  get province(): string {
    return !(isNullOrUndefined(this._province)) ? this._province : null;
  }

  set province(value: string) {
    this._province = value;
  }
  get country(): string {
    return !(isNullOrUndefined(this._country)) ? this._country : null;
  }

  set country(value: string) {
    this._country = value;
  }
  get postal(): string {
    return !(isNullOrUndefined(this._postal)) ? this._postal : null;
  }

  set postal(value: string) {
    this._postal = value;
  }
  get street(): string {
    return !(isNullOrUndefined(this._street)) ? this._street : null;
  }

  set street(value: string) {
    this._street = value;
  }
  /* Check if object has been set */
  isEmpty(): boolean {
    return (isNullOrUndefined(this._street) || isNullOrUndefined(this._city) || isNullOrUndefined(this._country) ||
      isNullOrUndefined(this._province) || isNullOrUndefined(this._postal) ) ? true : false;
  }
  /* Copy function */
  copy(object: Address) {
    this._street = object.street;
    this._city = object.city;
    this._country = object.country;
    this._postal = object.postal;
    this._province = object.province;
  }
}




