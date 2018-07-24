import {Component, DoCheck, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DateTimeService} from '../../../../services/date-time.service';
import {Router} from '@angular/router';

@Component({
  selector: 'fpcare-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  constructor( private fpcService: FPCareDataService
    , private dateTimeService: DateTimeService
    , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() { }

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
