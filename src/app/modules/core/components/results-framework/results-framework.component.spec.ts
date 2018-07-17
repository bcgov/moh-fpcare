import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsFrameworkComponent } from './results-framework.component';

describe('ResultsFrameworkComponent', () => {
  let component: ResultsFrameworkComponent;
  let fixture: ComponentFixture<ResultsFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
