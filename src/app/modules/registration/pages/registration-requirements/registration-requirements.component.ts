import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-registration-requirements',
  templateUrl: './registration-requirements.component.html',
  styleUrls: ['./registration-requirements.component.scss']
})
export class RegistrationRequirementsComponent extends Base implements OnInit {

  constructor( private router: Router ) {
    super();
  }

  ngOnInit() {
  }

  // Methods triggered by the form action bar
  /**
   * Navigates to the next page
   */
  continue() {
    this.router.navigate(['registration/financial']);
  }
}
