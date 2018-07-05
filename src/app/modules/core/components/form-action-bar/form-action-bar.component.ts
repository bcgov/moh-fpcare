import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fpcare-form-action-bar',
  templateUrl: './form-action-bar.component.html',
  styleUrls: ['./form-action-bar.component.scss']
})
export class FormActionBarComponent implements OnInit {
  @Input() submitLabel: string = "Submit";
  @Input() canContinue: boolean = true;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

}
