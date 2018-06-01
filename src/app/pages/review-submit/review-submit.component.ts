import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Base } from '../../core/base/base.class';

import { Applicant } from '../../models/applicant.model';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { CollegeDataService } from '../../services/college-data.service';
import { Colleges } from '../../models/colleges.enum';

import { SimpleDate } from '../../core/date/simple-date.interface';
import * as moment from 'moment'; //Only used in convertSimpelDateToText();
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss']
})
export class ReviewSubmitComponent extends Base implements OnInit {

  private hasValidToken = false;
  public applicant: Applicant;
  public Colleges: typeof Colleges = Colleges;

  constructor(
    // private router: Router,
    private dataStore: ApplicantDataService,
    private collegeData: CollegeDataService,
    private router: Router) {
    super();
    this.applicant = dataStore.applicant;
  }

  ngOnInit() {
  }

  print() {
    console.log('print - todo');
  }

  canContinue(): boolean {
    return this.hasValidToken;
  }

  onValidToken(event): void {
    console.log(event);
    this.hasValidToken = true;
  }

  continue(): void {
    console.log('---------------\all done!');
  }

  get collegeText(): string {
    return this.collegeData.getTextFromSelection(this.applicant.college);
  }

  /**
   * Converts SimpleDate object of integers to human readable, formatted date.
   * NOTE - Refactor this function to its own service if necessary, but currently only need to use this on the review screen.
   */
  convertSimpleDateToText(simpleDate: SimpleDate): string {

    if (simpleDate.year == null
      || simpleDate.month == null
      || simpleDate.day == null) {
      return null;
    }

    return moment.utc({
      year: simpleDate.year,
      month: simpleDate.month - 1, //Moment starts month indice at 0.
      day: simpleDate.day
    }).format('MMMM Do, YYYY');

  }

  back(): void {
    this.router.navigate(['user-acceptance']);
  }

}
