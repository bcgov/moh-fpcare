import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';

@Component({
  selector: 'fpcare-request-template',
  templateUrl: './request-template.component.html',
  styleUrls: ['./request-template.component.scss']
})
export class RequestTemplateComponent extends AbstractFormComponent implements OnInit, DoCheck {

  @Input() applicant: Person;
  @Input() buttonLabel: string;
  @Input() nextPg: string;

  constructor( protected router: Router ) {
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

  // Methods triggered by the form action bar

  continue() {
    if ( this.canContinue() ) {
      this.router.navigate([this.nextPg]);
    }
  }
}
