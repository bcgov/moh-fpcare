import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Person} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';

@Component({
  selector: 'fpcare-request-template',
  templateUrl: './request-template.component.html',
  styleUrls: ['./request-template.component.scss']
})
export class RequestTemplateComponent extends AbstractFormComponent implements OnInit {

  @Input() applicant: Person;
  @Input() buttonLabel: string;
  @Input() nextPg: string;

  constructor( protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return ( this.form.valid );
  }

  continue() {
    this.router.navigate([this.nextPg] );
  }
}
