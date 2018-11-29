import { Component, OnInit } from '@angular/core';
import {ErrorPageService} from './error-page.service';
import {DisplayIcon} from '../../modules/core/components/results-framework/results-framework.component';

@Component({
  selector: 'fpcare-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private errorPageService: ErrorPageService) {
  }

  ngOnInit() {
  }

  get errorResponse() {
    return this.errorPageService.errorResponse;
  }

  getErrorIcon(): number {
    return DisplayIcon.ERROR;
  }
}
