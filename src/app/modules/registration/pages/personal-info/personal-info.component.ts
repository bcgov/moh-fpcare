import {Component, DoCheck, OnInit} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {SimpleDate} from '../../../core/components/date/simple-date.interface';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Format string for displaying dates in this component */
  dateFormat: string = 'yyyy/mm/dd';

  constructor( private fpcService: FPCareDataService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {
    this._canContinue = this.form.valid;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcService.hasSpouse();
  }

  // Formatting functions
  formatDate( dt: SimpleDate ): string {
    const dtObj = new Date( dt.year, dt.month - 1, dt.day );
    return this.fpcService.formatDate( dtObj );
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {

    if ( this.canContinue() ) {
      const link = '/registration/child-info';
      this.router.navigate([link]);
    }
  }
}
