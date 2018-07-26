import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPageComponent } from './personal-info.component';
import { CoreModule } from '../../../core/core.module';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DateTimeService} from '../../../../services/date-time.service';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {RouterTestingModule} from '@angular/router/testing';

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
        DateTimeService
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
});
