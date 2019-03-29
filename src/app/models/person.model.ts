import { Person } from 'moh-common-lib/models';
import { Address } from './address.model';

/**
 * Information about person. Should be relevant to all people in app, from the
 * logged in user to people only displayed in records.
 */
export class FPCPerson extends Person {

  // Personal Health Number (validation mod 11 check - reuse logic from old web app)
  public phn: string;

  // Social Insurance Number (validation mod 10 check - reuse logic from old web app)
  public sin: string;

  // FPCare registration number
  public fpcRegNumber: string;

  // Contact information for person
  /* Mailing address for person */
  public address: Address = new Address();
  public updAddress: Address = new Address();

  /**
   *
   * @returns {boolean}
   */
  get isAddressUpdated(): boolean {
    return this.updAddress.isComplete();
  }

  // Remove formatting
  getNonFormattedPhn(): string {
    return this.removeStrFormat( this.phn );
  }

  getNonFormattedSin(): string {
    return this.removeStrFormat( this.sin );
  }

  getNonFormattedPostalCode(): string {
    return this.removeStrFormat( this.address.postal );
  }

  getNonFormattedUpdPostalCode(): string {
    return this.removeStrFormat( this.updAddress.postal );
  }

  /**
   *
   * @param {string} value
   * @returns {string}
   */
  private removeStrFormat( value: string ): string {

    return (value ? value.replace(/ /g, '') : null);
  }
}

