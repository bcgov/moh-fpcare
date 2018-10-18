import {Base} from '../modules/core/components/base/base.class';
import {DisplayIcon} from '../modules/core/components/results-framework/results-framework.component';
import {ServerPayload} from './api.model';

export abstract class AbstractResultsComponent extends Base {

  // Any class extending this one, must have a response structure that extends ServerPayload
  public response: ServerPayload = null;

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
      iconValue = this.response.success ? DisplayIcon.SUCCESS :
          (this.response.error ? DisplayIcon.ERROR : DisplayIcon.WARNING );
    }

    return iconValue;
  }
}
