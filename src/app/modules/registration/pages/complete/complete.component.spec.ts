import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletePageComponent } from './complete.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RegistrationService} from '../../registration.service';

describe('CompleteComponent', () => {
  let component: CompletePageComponent;
  let fixture: ComponentFixture<CompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompletePageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });
});
