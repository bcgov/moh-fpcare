import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationRequirementsComponent } from './registration-requirements.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { APP_BASE_HREF } from '@angular/common';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RegistrationService} from '../../registration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RegistrationRequirementsComponent', () => {
  let component: RegistrationRequirementsComponent;
  let fixture: ComponentFixture<RegistrationRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationRequirementsComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule
      ]
      ,
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        FPCareDataService,
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
