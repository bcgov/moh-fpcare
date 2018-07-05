import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';

/**
 * The "Page Framework" is a template to be used on FPCare pages to ensure
 * consistent layout.  It applies to most pages, but should NOT be used on
 * Dashboards, or full-width table components.
 *
 * <fpcare-page-framework>
 *  <div>This will go in the middle column</div>
 *  <p>So will this</p>
 *  <div right> This will go in the right column</div>
 * </fpcare-page-framework>
 *
 * @export
 * @class PageFrameworkComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'fpcare-page-framework',
  templateUrl: './page-framework.component.html',
  styleUrls: ['./page-framework.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageFrameworkComponent implements OnInit {
  constructor(private elem: ElementRef) { }
  @Input() layout: 'single' | 'double' | 'default' = 'default';

  ngOnInit(){
  }

}
