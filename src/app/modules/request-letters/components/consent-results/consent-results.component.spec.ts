import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentResultsComponent } from './consent-results.component';
import {CoreModule} from '../../../core/core.module';

describe('ConsentResultsComponent', () => {
  let component: ConsentResultsComponent;
  let fixture: ComponentFixture<ConsentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsentResultsComponent
      ],
      imports: [
        CoreModule
      ]
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
