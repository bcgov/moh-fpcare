import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FPCare – Applicant Enrollment';


  constructor(private userService: UserService,
    private dummyDataService: DummyDataService,
    private fpcareDataService: FPCareDataService ) {
  }

  ngOnInit() {
  }
}
