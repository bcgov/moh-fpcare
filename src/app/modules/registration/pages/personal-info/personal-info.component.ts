import {Component, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Base} from '../../../core/components/base/base.class';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ValidationService} from '../../../../services/validation.service';
import {SimpleDate} from '../../../core/components/date/simple-date.interface';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends Base implements OnInit {

  /** Format string for displaying dates in this component */
  dateFormat: string = 'yyyy/mm/dd';

  /** Form that contains fields to be validated */
  @ViewChild('formRef') form: NgForm;

  constructor( private fpcService: FPCareDataService
             , private router: Router
             , private validation: ValidationService ) {
    super();
  }

  ngOnInit() {
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
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this.form.valid;
  }

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
