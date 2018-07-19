import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fpcare-registration-requirements',
  templateUrl: './registration-requirements.component.html',
  styleUrls: ['./registration-requirements.component.scss']
})
export class RegistrationRequirementsComponent implements OnInit {

  constructor(private router: Router) { }

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
