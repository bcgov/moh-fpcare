import {Component} from '@angular/core';
import {ComponentData, LetterTypes} from '../request-template/request-template.component';
import {STANDALONE_CALCULATOR} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-request-cob',
  templateUrl: './request-cob.component.html',
  styleUrls: ['./request-cob.component.scss']
})
export class RequestCobComponent {

  public fpcare_calculator: string  = '/' + STANDALONE_CALCULATOR;

  cobRequest: ComponentData = {
    label: 'Request Confirmation',
    letterType: LetterTypes.COB_LETTER
  };

  constructor() {
  }

}
