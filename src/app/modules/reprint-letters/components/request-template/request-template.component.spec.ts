import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ComponentData, LetterTypes, RequestTemplateComponent} from './request-template.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ValidationService} from '../../../../services/validation.service';

/**
 * Used by COB & Consent request reprints - needs to create only
 */
describe('RequestTemplateComponent', () => {
  let component: RequestTemplateComponent;
  let fixture: ComponentFixture<RequestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(RequestTemplateComponent);
    component = fixture.componentInstance;
    component['fpcareDataService'].acceptedCollectionNotice = true;
    const requestPgData: ComponentData = {
      label: 'Request Confirmation',
      letterType: LetterTypes.COB_LETTER
    };
    component.data = requestPgData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });
});
