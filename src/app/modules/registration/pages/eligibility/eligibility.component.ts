import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router } from '@angular/router';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log("continue!");
    this.navigate('registration/personal-info');
  }

}
