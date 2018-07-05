import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from '../base/base.class';

const LETTER = /[A-Z]/i; //Ignore case here, then upperCase it via pipe.
const NUMBER = /\d/;
const SPACE = ' '; //Consistency!

@Component({
  selector: 'fpcare-postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.scss']
})
export class PostalCodeComponent extends Base implements OnInit {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() disabled: boolean;

  public mask = [LETTER, NUMBER, LETTER, SPACE, NUMBER, LETTER, NUMBER]

  upperCasePipe(text: string){
    return text.toUpperCase();
  }

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
