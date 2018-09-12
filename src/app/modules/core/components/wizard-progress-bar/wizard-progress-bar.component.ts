import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Base } from '../base/base.class';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'fpcare-wizard-progress-bar',
  templateUrl: './wizard-progress-bar.component.html',
  styleUrls: ['./wizard-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardProgressBarComponent extends Base implements OnInit {
  @Input() progressSteps: WizardProgressItem[] = [];
  @ViewChild('stepContainer') stepContainer: ElementRef;
  @ViewChildren('steps') steps: QueryList<ElementRef>;

  public activeIndex: number;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    super();
   }

  ngOnInit() {

    // Update the progress bar view on route change and _only_ route change.
    // Skip most of Angular's ChangeDetection in favour of manually optimizing.
    this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd),
      map((ev: NavigationEnd) => ev.url)
    ).subscribe(url => {
      this.activeIndex = this.getActiveIndex(url);
      this.cd.detectChanges();
    });

    // Must schedule first run manually, or bar won't be set.
    this.activeIndex = this.getActiveIndex(this.router.url);
  }

  calculateProgressPercentage(): Number {
    const denominator = this.progressSteps.length - 1;
    const numerator = this.activeIndex;

    if (denominator === 0 || numerator >= denominator){
      return 100;
    }

    return Math.round((numerator / denominator) * 100);
  }

  getActiveIndex(url): number {
    return this.progressSteps.findIndex(x => url.includes(x.route));
  }

}

export interface WizardProgressItem {
  title: string;
  route: string;
}
