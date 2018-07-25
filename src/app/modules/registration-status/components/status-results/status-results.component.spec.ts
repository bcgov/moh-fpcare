import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusResultsComponent } from './status-results.component';
import {ResultsFrameworkComponent} from '../../../core/components/results-framework/results-framework.component';
import {CoreModule} from '../../../core/core.module';
import {DummyDataService} from '../../../../services/dummy-data.service';

describe('StatusResultsComponent', () => {
  let component: StatusResultsComponent;
  let fixture: ComponentFixture<StatusResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusResultsComponent
      ],
      imports: [
        CoreModule
      ],
      providers: [
        DummyDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
