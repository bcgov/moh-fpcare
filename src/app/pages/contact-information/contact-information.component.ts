import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Applicant } from '../../models/applicant.model';

import { Base } from '../../core/base/base.class';
import { SecurityQuestions } from '../../models/security-questions';



@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent extends Base  {
  public applicant: Applicant;
  /** A list of all possible questions the user can choose from */
  public securityQuestions: any[];
  /** The 3 currently selected questions in the select2 dropdown on the page. */
  public selectedSecurityQuestions: any[];
  /** A local copy of applicant.securityQuestions, ensuring it matches the interface before pushing it to applicant.  */
  private securityQuestionAndAnswers: SecurityQuestions[] = [];

  public showAlternatePhoneError = false;

  @ViewChild('altEmail') altEmail: ElementRef;
  @ViewChild('altPhoneNumber') altPhoneNumber: ElementRef;

  constructor(private router: Router,
    private applicantData: ApplicantDataService) {
    super();
    this.applicant = applicantData.applicant;

    //Note - This will be changing. Questions will be stored on backend, and we will fetch on init + send ids.
    this.securityQuestions = [
      { id: 'What was your first pet\'s name?', text: 'What was your first pet\'s name?' },
      { id: 'What was the make of your first car?', text: 'What was the make of your first car?' },
      { id: 'What was the last name of your favourite teacher?', text: 'What was the last name of your favourite teacher?' },
      { id: 'What was the last name of  your childhood best friend?', text: 'What was the last name of your childhood best friend?' },
      { id: 'What is your oldest cousin\'s first name?', text: 'What is your oldest cousin\'s first name?' },
      { id: 'What town was your father born in?', text: 'What town was your father born in?' },
      { id: 'What town was your mother born in?', text: 'What town was your mother born in?' },
      { id: 'Where did you meet your spouse?', text: 'Where did you meet your spouse?' },
      { id: 'What year did you meet your spouse?', text: 'What year did you meet your spouse?' },
      { id: 'What is the name of your favourite book?', text: 'What is the name of your favourite book?' }
    ];

    this.initSecurityQuestions();
  }

  /**
   * Either gets persisted Applicant security question data, or initializes
   * default values. The array must be initialized before user action.
   */
  private initSecurityQuestions() {
    //Use persisted security questions if possible
    if (this.applicant.hasSecurityQuestions) {
      this.selectedSecurityQuestions = this.applicant.securityQuestions.map(x => {
        return { id: x.question, text: x.question };
      });
      this.securityQuestionAndAnswers = this.applicant.securityQuestions;
    }
    else {
      //Nothing is persisted, so initialize default values.
      this.selectedSecurityQuestions = this.securityQuestions.slice(0, 3);

      //Initialize values, otherwise we get undefined/null errors in template
      for (let index = 0; index <= 2; index++) {
        this.securityQuestionAndAnswers[index] = {
          question: this.selectedSecurityQuestions[index].text,
          answer: null
        };
      }

      //Now that the controller's questions are initialized, copy to applicant model.
      this.applicant.securityQuestions = this.securityQuestionAndAnswers;
    }
  }

  onSecurityQuestionChange(event, count: number) {
    const index = count - 1;
    this.securityQuestionAndAnswers[index].question = event.value;
    this.applicant.securityQuestions = this.securityQuestionAndAnswers;
    this.selectedSecurityQuestions[index] = { id: event.value, text: event.value };
  }

  onSecurityAnswerChange(input, count: number) {
    const index = count - 1;
    this.applicant.securityQuestions[index].answer = input;
  }

  onAlternateFieldChange(){
    this.showAlternatePhoneError = !(this.altPhoneNumber.nativeElement.value || this.altEmail.nativeElement.value);
    this.applicant.altPhoneNumber = this.altPhoneNumber.nativeElement.value;
    this.applicant.altEmailAddress = this.altEmail.nativeElement.value;
  }

  selectQuestion(question, event) {
    question.selected = event.target.checked;
  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['self-declaration']);
  }

  back(): void {
    this.router.navigate(['site-access']);
  }

}
