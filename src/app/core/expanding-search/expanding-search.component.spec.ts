import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingSearchComponent } from './expanding-search.component';

describe('ExpandingSearchComponent', () => {
  let component: ExpandingSearchComponent;
  let fixture: ComponentFixture<ExpandingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
