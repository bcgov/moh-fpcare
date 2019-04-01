import { Component, OnInit } from '@angular/core';
import { pageRoutes } from '../../registration-page-routing';
import { WizardProgressItem } from 'moh-common-lib/models';

@Component({
  selector: 'fpcare-registration-component',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Interface for wizard progress items
    this.progressSteps = pageRoutes.map(page => {
      if (page.path !== '') {
        return {
          title: this.convertRouteToTitle(page.path),
          route: page.path
        };
      }
    }).filter( x => x );
  }

  progressSteps: WizardProgressItem[];

  /**
   * Converts a lower case string of a route in a user readable title.  e.g.
   * "personal-info" -> "Personal Info"
   *
   * @param {string} routePath
   */
  convertRouteToTitle(routePath: string): string{
    return routePath.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
  }
}
