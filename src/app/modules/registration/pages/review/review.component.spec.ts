import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review.component';
import { CoreModule } from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {RegistrationService} from '../../registration.service';

describe('ReviewComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewPageComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
