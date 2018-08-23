import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityPageComponent } from './eligibility.component';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {ValidationService} from '../../../../services/validation.service';

describe('EligibilityComponent', () => {
  let component: EligibilityPageComponent;
  let fixture: ComponentFixture<EligibilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EligibilityPageComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
        ValidationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityPageComponent);
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
