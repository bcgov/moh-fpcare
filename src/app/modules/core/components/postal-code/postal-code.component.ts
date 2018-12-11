import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import {LETTER, Masking, NUMBER, SPACE} from '../../../../models/masking.model';

@Component({
  selector: 'fpcare-postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.scss'],

  // Re-use the same ngForm that it's parent is using. The component will show
  // up in its parents `this.form`, and will auto-update `this.form.valid`
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class PostalCodeComponent extends Masking implements OnInit {

  public mask = [LETTER, NUMBER, LETTER, SPACE, NUMBER, LETTER, NUMBER];
  public placeholder = 'V1V V1V';

  @Input() label: string = 'Mailing Postal Code';

  constructor() {
    super();
   }

  ngOnInit() {
  }
}
