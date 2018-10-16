import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReprintStatusComponent } from './reprint-status.component';
import {CoreModule} from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConsentResultsComponent', () => {
  let component: ReprintStatusComponent;
  let fixture: ComponentFixture<ReprintStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReprintStatusComponent
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
    fixture = TestBed.createComponent(ReprintStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
