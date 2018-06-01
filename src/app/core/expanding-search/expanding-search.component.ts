import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Base } from '../base/base.class';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

const TIMING = "350ms";

@Component({
  selector: 'fpcare-expanding-search',
  templateUrl: './expanding-search.component.html',
  styleUrls: ['./expanding-search.component.scss'],
  animations: [
    trigger('reveal', [
      transition('void => *', [
        animate(TIMING, keyframes([
          style({width: '0', transform: 'translateZ(-30px)'    }),
          style({width: '*'}),
        ]))
      ]),
      transition('* => void', [
        animate(TIMING, keyframes([
          style({width: '*'}),
          style({width: '0', transform: 'translateZ(-30px)'     }),
        ]))
      ])
    ]),
    trigger('hinge', [
      transition('void => *', [
        animate(TIMING, keyframes([
          style({transform: 'rotateY(-125deg)' }),
          style({transform: 'rotateY(0deg)' }),
          // style({width: '*'}),
        ]))
      ]),
      transition('* => void', [
        animate(TIMING, keyframes([
          style({transform: 'rotateY(0deg)' }),
          style({transform: 'rotateY(-125deg)' }),
        ]))
      ])
    ]),
  ]
})
export class ExpandingSearchComponent extends Base implements OnInit {
  searchPhrase: string;
  showSearch: boolean = false;

  @Input() placeholder: string;
  @Input() alwaysShow: boolean;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchElement') searchElement: ElementRef;

  constructor() {
    super();
   }

  ngOnInit() {
    if (this.alwaysShow){
      this.showSearch = true;
    }
  }

  toggleSearch() {
    if (this.alwaysShow) return;

    this.showSearch = !this.showSearch;
    if (this.showSearch){
      // Element needs to be created after toggled on.
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0)
    }
  }

  onSearchChange(changes){
    this.searchPhrase = changes;
    this.onChange.emit(this.searchPhrase);
  }

}
