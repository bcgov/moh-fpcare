import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() pageTitle: string;
  @Output() onContinue: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

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

  onClick() {
    this.onContinue.emit( this.canContinue() );
  }
}
