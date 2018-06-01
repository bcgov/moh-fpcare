import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fpcare-applicant-breadcrumbs',
  templateUrl: './applicant-breadcrumbs.component.html',
  styleUrls: ['./applicant-breadcrumbs.component.scss']
})
export class ApplicantBreadcrumbsComponent implements OnInit {
  @Input() pageName: string;
  @Input() nextPageLink: string;
  @Input() previousPageLink: string;

  constructor() { }

  ngOnInit() {
  }

}
