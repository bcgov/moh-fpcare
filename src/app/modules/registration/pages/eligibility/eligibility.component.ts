import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router } from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcareDataService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcareDataService.hasSpouse();
  }

  /**
   * Indicates whether user can proceed to next page
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this.form.valid;
  }

  /**
   * Navigates to next page
   */
  continue(): void {
    this.navigate('registration/personal-info');
  }

}
