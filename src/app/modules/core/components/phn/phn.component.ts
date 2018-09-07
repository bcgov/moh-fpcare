import {Component, OnInit} from '@angular/core';
import {Masking, NUMBER, SPACE} from '../../../../models/masking.model';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'fpcare-phn',
  templateUrl: './phn.component.html',
  styleUrls: ['./phn.component.scss'],

  // Re-use the same ngForm that it's parent is using. The component will show
  // up in its parents `this.form`, and will auto-update `this.form.valid`
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class PhnComponent extends Masking implements OnInit {

  public mask = [NUMBER, NUMBER, NUMBER, NUMBER, SPACE, NUMBER, NUMBER, NUMBER, SPACE, NUMBER, NUMBER, NUMBER];
  public placeholder = '1111 111 111';

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
