import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusResultsComponent } from './status-results.component';
import {CoreModule} from '../../../core/core.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';

describe('StatusResultsComponent', () => {
  let component: StatusResultsComponent;
  let fixture: ComponentFixture<StatusResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusResultsComponent
      ],
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
          FPCareDataService
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
