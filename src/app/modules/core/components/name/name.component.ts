import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import { Base } from 'moh-common-lib/models';

@Component({
  selector: 'fpcare-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],

  // Re-use the same ngForm that it's parent is using. The component will show
  // up in its parents `this.form`, and will auto-update `this.form.valid`
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]
})
export class NameComponent extends Base implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() nameMaxLen: number;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  /**
   * Updates the value
   * @param {string} value
   */
  onUpdate( value: string ) {
    this.valueChange.emit( value );
  }
}
