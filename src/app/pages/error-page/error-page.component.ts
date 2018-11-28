import { Component, OnInit } from '@angular/core';
import {ResponseStoreService} from '../../services/response-store.service';

@Component({
  selector: 'fpcare-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private responseStore: ResponseStoreService) { }

  ngOnInit() {
  }

  get errorResponse() {
    return this.responseStore.error;
  }

}
