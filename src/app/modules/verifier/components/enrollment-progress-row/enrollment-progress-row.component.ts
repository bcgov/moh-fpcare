import { Component, OnInit, Input } from '@angular/core';
import { growVertical } from '../../../../animations/animations';
import { SiteAccess, SiteAccessProgressSteps } from '../../../../models/sites.model';


@Component({
  selector: 'fpcare-enrollment-progress-row',
  templateUrl: './enrollment-progress-row.component.html',
  styleUrls: ['./enrollment-progress-row.component.scss'],
  animations: [growVertical]
})
export class EnrollmentProgressRowComponent implements OnInit {
  @Input() open: boolean = false;
  @Input() data: SiteAccess;

  constructor() { }

  ngOnInit() {}

  get openState(): string {
    return open ? "opened" : "closed";
  }

  // Makes it easy to iterate over an enum in the template. Only for use in the
  // template. Used in conjunction with activeStepIndex
  get iterableNumberOfSteps(): Array<any> {
    return Array(Object.keys(SiteAccessProgressSteps).length);
  }

  get activeStepIndex(): number {
    return Object.keys(SiteAccessProgressSteps).indexOf(this.data.progress);
  }

}
