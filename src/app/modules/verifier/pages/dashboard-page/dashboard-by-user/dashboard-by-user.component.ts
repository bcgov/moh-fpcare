import { Component, OnInit } from '@angular/core';
import { FPCareDataService } from '../../../../../services/fpcare-data.service';
import { EnrollmentRowItem } from '../../../components/enrollment-row/enrollment-row.interface';


@Component({
  selector: 'fpcare-dashboard-by-user',
  templateUrl: './dashboard-by-user.component.html',
  styleUrls: ['./dashboard-by-user.component.scss']
})
export class DashboardByUserComponent {
  constructor(private dataService: FPCareDataService) { }

  get enrollmentByUserData(): EnrollmentRowItem[] {
    return this.dataService.getEnrollmentByUser();
  }

}
