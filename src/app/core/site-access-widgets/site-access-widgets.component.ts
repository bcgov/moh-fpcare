import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { SiteAccess, SiteAccessProgressSteps } from '../../models/sites.model';
import { EnrollmentStatus } from '../../models/fpcare.models';
import { VerifierService } from '../../services/verifier.service';
@Component({
  selector: 'fpcare-site-access-widgets',
  templateUrl: './site-access-widgets.component.html',
  styleUrls: ['./site-access-widgets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteAccessWidgetsComponent implements OnInit {
  @Input() data: SiteAccess[] = [];
  public renewalDateCutoff: number = 30;
  public applicationProgressSelector: SiteAccessProgressSteps;
  public pieChartData;

  @ViewChild('pieChartContainer') pieChartContainer: ElementRef;


  constructor(private verifierService: VerifierService) { }

  //Current max width, but doesn't really play nice with mobile views
  public pieChartDimension: number[] = [];

  ngOnInit() {
    this.applicationProgressSelector = SiteAccessProgressSteps.Verifier;
    this.pieChartData = this.calculatePieChartData();

    // Very hacky and should be for prototype only! Possibly remove/replace
    // entire chart library because this one does not play nicely and on re-size
    // it continually breaks / infinitely grows.  The height value determines if
    // the entire legend is visible.
    this.pieChartDimension = [
      this.pieChartContainer.nativeElement.offsetWidth,
      this.pieChartContainer.nativeElement.offsetHeight,
    ]
  }

  // Make enum accessible to template
  get SiteAccessProgressSteps() {
    return Object.keys(SiteAccessProgressSteps);
  }

  // Make enum iterable strings accessible in template
  get EnrollmentStatus() {
    return Object.keys(EnrollmentStatus);
  }

  //days: 30/60/90
  upcomingRenewals(days: number){
    // Copy the array so our sorting doesn't mess up other places
    let result: SiteAccess[] = this.data.concat();

    // Expiring soon are at beginning of array
    result.sort((a, b) => {
      return a.endDate.getTime() - b.endDate.getTime()
    })

    return result.filter(sa => sa.daysUntilExpiry <= days);
  }

  applicationProgress(){
    let selection: SiteAccessProgressSteps = this.applicationProgressSelector;

    // Copy the array so our sorting doesn't mess up other places
    let result: SiteAccess[] = this.data.concat();
    // Filter to only show 'problem' results, to match enrollment list
    result = result.filter(x => x.alert);

    return result.filter(sa => sa.progress === selection);
  }

  calculatePieChartData() : {name: string, value: number}[] {
    return this.EnrollmentStatus.map(status => {
      return {
        name: status,
        value: this.data.filter(sa => sa.status === status).length
      }
    })
  }

  onPieChartClick($event){
    // console.log('onPieChartClick', $event);
    this.verifierService.enrollmentViewTypeSelector = $event.name;
  }


  colorScheme = {
    // primary/secondary/etc, from variables.scss
    domain: ['#036', '#fcba19', '#486446', '#96c0e6']
  };

}
