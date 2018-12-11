import { Component } from '@angular/core';
import {ComponentData, LetterTypes} from '../request-template/request-template.component';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'fpcare-request-consent',
  templateUrl: './request-consent.component.html',
  styleUrls: ['./request-consent.component.scss']
})
export class RequestConsentComponent {

  public links = environment.links;

  consentRequest: ComponentData = {
    label: 'Request Consent',
    letterType: LetterTypes.CONSENT_LETTER
  };

  constructor() {
  }
}
