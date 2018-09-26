import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {EligibilityPayload} from '../../models/api.model';

export interface RegistrationItem {
  route: string;
  isComplete: boolean;
}

@Injectable()
export class RegistrationService {

  public registrationItems: RegistrationItem [] = [];

  constructor( private router: Router ) {}

  /**
   *
   */
  setItemIncomplete(): void {
    const idx = this.getUrlIndex( this.router.url );
    if ( !this.isEmpty() ) { // Check guards could be turned off in dev environment
      this.registrationItems = this.registrationItems.map((item, index) => {
        if (index >= idx) {
          item.isComplete = false;
        }
        return item;
      });
    }
  }

  /**
   *
   */
  setItemComplete(): void {
    const idx = this.getUrlIndex( this.router.url );
    if ( !this.isEmpty() ) { // Check guards could be turned in dev environment
      this.registrationItems[idx].isComplete = true;
    }
  }

  /**
   *
   * @param {string} url
   * @returns {boolean}
   */
  isComplete( url: string ): boolean {
    const idx = this.getUrlIndex( url );

    // returns previous items isComplete value
    return (idx - 1 >= 0) ? this.registrationItems[idx - 1].isComplete : true;
  }

  /**
   *
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return (this.registrationItems.length === 0);
  }

  /**
   *
   * @param {string} url
   * @returns {number}
   */
  private getUrlIndex( url: string ): number {
    return this.registrationItems.findIndex( x => url.includes( x.route ) );
  }
}
