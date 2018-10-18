import {Component, Input} from '@angular/core';

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
export class ResultsFrameworkComponent {

  @Input() displayIcon: DisplayIcon = DisplayIcon.SUCCESS;
  @Input() hasBody: boolean = true;

  constructor() { }

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
