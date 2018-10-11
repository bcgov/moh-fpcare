import { Component, OnInit } from '@angular/core';
import {
  REGISTRATION_PATH, REGISTRATION_REQUIREMENTS,
  REGISTRATION_STATUS_PATH,
  REPRINT_COB,
  REPRINT_CONSENT,
  REPRINT_LETTERS_PATH,
  REQUEST_REG_STATUS
} from '../../models/route-paths.constants';

@Component({
  selector: 'fpcare-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public confirmAssistance: string = '/' + REPRINT_LETTERS_PATH + '/' + REPRINT_COB;
  public requestConsent: string = '/' + REPRINT_LETTERS_PATH + '/' + REPRINT_CONSENT;
  public requestRegStatus: string = '/' + REGISTRATION_STATUS_PATH + '/' + REQUEST_REG_STATUS;
  public registration: string = '/' + REGISTRATION_PATH +  '/' + REGISTRATION_REQUIREMENTS;


  ngOnInit() {
  }

}
