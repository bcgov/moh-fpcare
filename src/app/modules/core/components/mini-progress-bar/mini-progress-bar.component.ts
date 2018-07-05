import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fpcare-mini-progress-bar',
  templateUrl: './mini-progress-bar.component.html',
  styleUrls: ['./mini-progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MiniProgressBarComponent implements OnInit {
  /** Number of steps to show to the user */
  @Input() maxSteps: number;
  /** Number of steps to be marked as completed. */
  @Input() currentStep: number;

  constructor() { }

  ngOnInit() {
  }

  // Converts a number into an array with as many undefined elements
  get maxStepsIterable(): Array<undefined> {
    return new Array(this.maxSteps);
  }
}
