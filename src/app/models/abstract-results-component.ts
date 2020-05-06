import { Base } from 'moh-common-lib/models';
import {DisplayIcon} from '../modules/core/components/results-framework/results-framework.component';
import {ServerPayload} from './api.model';

export abstract class AbstractResultsComponent extends Base {

  // Any class extending this one, must have a response structure that extends ServerPayload
  public response: ServerPayload = null;
  protected abstract destroyResults(): void;

  get status(): string {
    if (this.response) {
      return this.response.message;
    }
  }

  /**
   *
   * @returns {number}
   */
  getIcon(): number {
    let iconValue = DisplayIcon.ERROR;

    if ( this.response ) {
      iconValue = this.isSuccess ? DisplayIcon.SUCCESS :
          (this.isError ? DisplayIcon.ERROR : DisplayIcon.WARNING );
    }

    return iconValue;
  }

  get isSuccess(): boolean {
    return this.response.success;
  }

  get isWarning(): boolean {
    return this.response.warning;
  }

  get isError(): boolean {
    return this.response.error;
  }

  ngOnDestroy() {
    this.destroyResults();
  }
}
