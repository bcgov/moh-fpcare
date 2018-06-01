import { Component, OnInit } from '@angular/core';
import { EnrollmentRowItem } from '../../../components/enrollment-row/enrollment-row.interface';
import { FPCareDataService } from '../../../../../services/fpcare-data.service';

@Component({
  selector: 'fpcare-dashboard-by-site',
  templateUrl: './dashboard-by-site.component.html',
  styleUrls: ['./dashboard-by-site.component.scss']
})
export class DashboardBySiteComponent {
  constructor(private dataService: FPCareDataService) { }

  get enrollmentBySiteData(): EnrollmentRowItem[] {
    return this.dataService.getEnrollmentBySite();
  }

}
