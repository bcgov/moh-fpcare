import { Component, OnInit, Input } from '@angular/core';
import { EnrollmentAlert } from '../../models/sites.model';

@Component({
  selector: 'fpcare-pill-badge',
  templateUrl: './pill-badge.component.html',
  styleUrls: ['./pill-badge.component.scss']
})
export class PillBadgeComponent implements OnInit {


  /** The data for this component. It *must* be an array, even if you're only
   * passing one alert. */
  @Input() alerts: EnrollmentAlert[];
  distinctBadges: any[] = [];


  @Input() level: string;
  @Input() title: string;
  @Input() count: number;

  /** Only show an icon, and use a tooltip to reveal text. */
  @Input() iconOnly: boolean = false;

  constructor() { }

  ngOnInit() {
    this.count = this.alerts.length;

    // Process Array
    if (this.alerts && this.alerts.length){
      const alertTypes = this.alerts.map(x => x.status)
      .filter(this.filterUnique);

      // Break each "type" of alert into a distinc element/text/colour
      this.distinctBadges = alertTypes.map(type => {
        const alertOfType = this.alerts.filter(x => x.status === type);
        return {
          title: type, // same for all in array
          level: alertOfType[0].level, // Level is same for all in array
          count: alertOfType.length
        }
      });


    }
  }

  private filterUnique(x, i, a){
    return x && a.indexOf(x) === i
  }

}
