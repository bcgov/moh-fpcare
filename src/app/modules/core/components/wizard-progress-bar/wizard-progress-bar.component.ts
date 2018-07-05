import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '../base/base.class';

@Component({
  selector: 'fpcare-wizard-progress-bar',
  templateUrl: './wizard-progress-bar.component.html',
  styleUrls: ['./wizard-progress-bar.component.scss']
})
export class WizardProgressBarComponent extends Base implements OnInit {
  @Input() progressSteps: WizardProgressItem[] = [];
  @ViewChild('stepContainer') stepContainer: ElementRef
  @ViewChildren('steps') steps: QueryList<ElementRef>;

  constructor(private router: Router) {
    super();
   }

  ngOnInit() {
  }

  calculateProgressPercentage(): Number {
    const denominator = this.progressSteps.length - 1;
    const numerator = this.activeIndex;

    if (denominator === 0 || numerator >= denominator){
      return 100;
    }

    return Math.round((numerator / denominator) * 100);
  }

  get activeIndex(): number {
    return this.progressSteps.findIndex(x => this.router.url.includes(x.route));
  }

}

export interface WizardProgressItem {
  title: string;
  route: string;
}
