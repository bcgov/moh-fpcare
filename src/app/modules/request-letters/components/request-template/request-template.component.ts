import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Person} from '../../../../models/person.model';

@Component({
  selector: 'fpcare-request-template',
  templateUrl: './request-template.component.html',
  styleUrls: ['./request-template.component.scss']
})
export class RequestTemplateComponent implements OnInit {

  @ViewChild('formRef') form: NgForm;

  @Input() applicant: Person;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  buttonLabel(): string {
    return 'Request Confirmation';
  }

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this.form.valid;
  }

  // TODO: Code functionality
  continue() {

  }
}
