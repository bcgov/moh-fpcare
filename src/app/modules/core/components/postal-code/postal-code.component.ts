import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from '../base/base.class';
import { ControlContainer, NgForm } from '@angular/forms';

const LETTER = /[A-Z]/i; //Ignore case here, then upperCase it via pipe.
const NUMBER = /\d/;

@Component({
  selector: 'fpcare-postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.scss'],

  // Re-use the same ngForm that it's parent is using. The component will show
  // up in its parents `this.form`, and will auto-update `this.form.valid`
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class PostalCodeComponent extends Base implements OnInit {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() disabled: boolean;

  public mask = [LETTER, NUMBER, LETTER, NUMBER, LETTER, NUMBER];

  upperCasePipe(text: string){
    return text.toUpperCase();
  }

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
