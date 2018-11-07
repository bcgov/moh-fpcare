import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'fpcare-header',
  templateUrl: './fpcare-header.component.html',
  styleUrls: ['./fpcare-header.component.scss']
})
export class FPCareHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  public skipLinkPath;
  private SKIP_CONTENT_HASH = '#content';

  ngOnInit() {

    this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd),
    ).subscribe(this.updateSkipContentLink.bind(this));

    this.updateSkipContentLink();
  }

  routeIsActive(url: string): boolean {
    return this.router.url.includes(url);
  }

  updateSkipContentLink(){
    this.skipLinkPath = this.generateSkipToContentLink();
  }

  // Slightly complicated because we have to include the deployUrl in manually.
  // If deployUrl changes this code must too.
  //
  // "http://full-url.com/fpcare/example#content"
  private generateSkipToContentLink(): string{
    // don't add duplicate #contents
    if (window.location.href.indexOf(this.SKIP_CONTENT_HASH) !== -1) {
      return window.location.href;
    }

    return `${window.location.origin}/fpcare${this.router.url}#content`;
  }
}
