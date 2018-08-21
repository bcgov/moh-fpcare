import {Component} from '@angular/core';
import {ComponentData, LetterTypes} from '../request-template/request-template.component';

@Component({
  selector: 'fpcare-request-cob',
  templateUrl: './request-cob.component.html',
  styleUrls: ['./request-cob.component.scss']
})
export class RequestCobComponent {

  cobRequest: ComponentData = {
    label: 'Request Confirmation',
    letterType: LetterTypes.COB_LETTER
  };

  constructor() {
  }

}
