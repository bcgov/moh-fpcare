import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentResultsComponent } from './consent-results.component';

describe('ConsentResultsComponent', () => {
  let component: ConsentResultsComponent;
  let fixture: ComponentFixture<ConsentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
