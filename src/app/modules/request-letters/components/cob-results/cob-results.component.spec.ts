import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobResultsComponent } from './cob-results.component';

describe('CobResultsComponent', () => {
  let component: CobResultsComponent;
  let fixture: ComponentFixture<CobResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
