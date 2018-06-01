import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'fpcare-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  //TODO: Private. Also add type! Observable?
  public breadcrumbs$;
  public data;

  ngOnInit() {
    //FIXME: Known bug. breadcrumbs$ is only populated after a router navigation event, which means on first load it will be empty.  Need to find a way to trigger breadcrumbs$ to be populated after everything has inited but before user causes a navigation event.
    this.breadcrumbs$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .distinctUntilChanged()
    .map(event =>  this.buildBreadCrumb(this.activatedRoute.root));
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    //If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        //If we are not on our current path yet,
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}

}

interface Breadcrumb {
  label: string;
  url: string;
}
