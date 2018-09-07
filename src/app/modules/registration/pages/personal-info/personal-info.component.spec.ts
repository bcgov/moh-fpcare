import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPageComponent } from './personal-info.component';
import { CoreModule } from '../../../core/core.module';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {RouterTestingModule} from '@angular/router/testing';
import {ValidationService} from '../../../../services/validation.service';
import {RegistrationService} from '../../registration.service';

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoPageComponent;
  let fixture: ComponentFixture<PersonalInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonalInfoPageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
        ValidationService,
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoPageComponent);
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
