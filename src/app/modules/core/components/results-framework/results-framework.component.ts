import {Component, Input, OnInit} from '@angular/core';

export enum DisplayIcon {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2
}

@Component({
  selector: 'fpcare-results-framework',
  templateUrl: './results-framework.component.html',
  styleUrls: ['./results-framework.component.scss']
})
export class ResultsFrameworkComponent implements OnInit {

  @Input() displayIcon: DisplayIcon = DisplayIcon.SUCCESS;
  @Input() hasBody: boolean = true;

  constructor() { }

  ngOnInit( ) {
    console.log( 'hasBody: ', this.hasBody );
  }

  get errorIcon() {
    return DisplayIcon.ERROR;
  }

  get successIcon() {
    return DisplayIcon.SUCCESS;
  }

  get warningIcon() {
    return DisplayIcon.WARNING;
  }
}
