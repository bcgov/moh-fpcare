import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../../services/validation.service';
import {FormValidationBase} from '../../../../models/form-validation-base';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends FormValidationBase implements OnInit {

  /** Format string for displaying dates in this component */
  dateFormat: string = 'yyyy/mm/dd';

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

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {

    console.log( 'this._formValid ', this._formValid );
    return !!this._formValid ;
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
