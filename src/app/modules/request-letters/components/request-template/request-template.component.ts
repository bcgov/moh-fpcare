import {Component, DoCheck, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDateComponent} from '../../../core/components/date/date.component';

@Component({
  selector: 'fpcare-request-template',
  templateUrl: './request-template.component.html',
  styleUrls: ['./request-template.component.scss']
})
export class RequestTemplateComponent extends AbstractFormComponent implements OnInit, DoCheck {

  @Input() applicant: Person;
  @Input() buttonLabel: string;
  @Input() nextPg: string;

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  constructor( protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    let valid = this.form.valid;

    valid = valid && !!this.dobForm;
    if ( !!this.dobForm ) {
      valid = valid && (this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true).length === 0);
    }

    this._canContinue = valid;
  }

  // Methods triggered by the form action bar

  continue() {
    if ( this.canContinue() ) {
      this.router.navigate([this.nextPg]);
    }
  }
}
