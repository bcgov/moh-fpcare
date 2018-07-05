import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fpcare-header',
  templateUrl: './fpcare-header.component.html',
  styleUrls: ['./fpcare-header.component.scss']
})
export class FPCareHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeIsActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
