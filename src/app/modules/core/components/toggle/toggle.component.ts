import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from 'moh-common-lib/models';

@Component({
  selector: 'fpcare-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class FPCareToggleComponent extends Base implements OnInit {

  @Input() data: boolean;
  @Input() label: string;
  @Output() dataChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
