import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingAddressPageComponent } from './mailing-address.component';
import { CoreModule } from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';

describe('MailingAddressComponent', () => {
  let component: MailingAddressPageComponent;
  let fixture: ComponentFixture<MailingAddressPageComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MailingAddressPageComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingAddressPageComponent);
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
