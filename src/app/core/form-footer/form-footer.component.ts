import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Base } from '../base/base.class';
@Component({
  selector: 'fpcare-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FPCareFormFooterComponent extends Base implements OnInit {
  @Input() locked: boolean;
  @Input() disableBack: boolean;
  @Output() onContinue: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  continue(){
    this.onContinue.emit();
  }

  back(){
    this.onBack.emit();
  }

}
