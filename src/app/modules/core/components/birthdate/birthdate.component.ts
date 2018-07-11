import {Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {Person} from '../../../../models/person.model';


@Component({
    selector: 'fpc-birthdate',
    templateUrl: './birthdate.component.html',
    styleUrls: ['./birthdate.component.scss']

})
export class BirthDateComponent {

  // Create today for comparison in check later
  today: any;
  constructor( private cd: ChangeDetectorRef ) {
   // super(cd);
    this.today = moment();
  }

  @Input() person: Person;
  @Input() showError: boolean;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('formRef') form: NgForm;

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(values => {
      this.onChange.emit(values);
    });
  }

  setYearValueOnModel(value: number) {
    this.person.dobYear = value;
  }

  setDayValueOnModel(value: number) {
    this.person.dobDay = value;
  }

  /**
   * Determine if date of birth is valid for the given person
   *
   * @returns {boolean}
   */
  isCorrectFormat(): boolean {

    // Validate
    if ( this.person &&
         this.person.dateOfBirth ) { //TODO: check validity of date
        return true;
    }

    return false;
  }

/*
  isInTheFuture(): boolean {

    return this.person.dob.isAfter(this.today);
  }

  tooFarInThePast(): boolean {
    const far = (this.today.get('y') - this.person.dob.get('y')) > 150;

    return far;
  }
*/
 // ageCheck(): boolean {
    // Applicant rules
    //  if (this.person.relationship === Relationship.Applicant) {
    // must be 16 or older for applicant
    //      let tooYoung = this.person.dob.isAfter(moment().subtract(16, 'years'))
    //     return !tooYoung;
    //}
    // ChildUnder19 rules
    // else if (this.person.relationship === Relationship.ChildUnder19) {
    // must be less than 19 if not in school
    //       let lessThan19 = this.person.dob.isAfter(moment().subtract(19, 'years'))
    //      return lessThan19;

 // }

  // ChildUnder24 rules - Account Management Child
  //    else if (this.person.relationship === Relationship.ChildUnder24) {
  //        let tooOld = this.person.dob.isBefore(moment().subtract(24, 'years'));
  //        return !tooOld;

  //   }
  //   else if (this.person.relationship === Relationship.Child19To24) {
  // if child student must be between 19 and 24

  //       let tooYoung = this.person.dob.isAfter(moment().subtract(19, 'years'));
  //        let tooOld = this.person.dob.isBefore(moment().subtract(24, 'years'));

  //       if (tooYoung) {
  // console.log('This child is less than 19 years old.')
  //       }
  //       if (tooOld) {
  // console.log('This child is older than 24.')
  //       }
  //        let ageInRange = !tooYoung && !tooOld;
  //        return ageInRange;
  //    } else {
  //        return true;
    //}
  //      return true;
  //  }

    /*
isValid(): boolean {
    return this.isCorrectFormat() && !this.isInTheFuture() && !this.tooFarInThePast() && this.ageCheck();
}
*/
}
