import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RequestConsentComponent} from './request-consent.component';
import {CoreModule} from '../../../core/core.module';
import {ComponentData, LetterTypes, RequestTemplateComponent} from '../request-template/request-template.component';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ValidationService} from '../../../../services/validation.service';

/**
 * TODO:
 * Add tests for unit testing
 */
describe('RequestConsentComponent', () => {
  let component: RequestConsentComponent;
  let fixture: ComponentFixture<RequestConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestConsentComponent,
        RequestTemplateComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        FPCareDataService,
        ValidationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestConsentComponent);
    component = fixture.componentInstance;
    const requestPgData: ComponentData = {
      label: 'Request Consent',
      letterType: LetterTypes.CONSENT_LETTER
    };
    component.consentRequest = requestPgData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
