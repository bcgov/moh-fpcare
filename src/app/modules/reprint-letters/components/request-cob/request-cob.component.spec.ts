import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCobComponent } from './request-cob.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {ComponentData, LetterTypes, RequestTemplateComponent} from '../request-template/request-template.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ValidationService} from '../../../../services/validation.service';

/**
 * TODO:
 * Add tests for unit testing
 */
describe('RequestCobComponent', () => {
  let component: RequestCobComponent;
  let fixture: ComponentFixture<RequestCobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestCobComponent,
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
    fixture = TestBed.createComponent(RequestCobComponent);
    component = fixture.componentInstance;;
    const requestPgData: ComponentData = {
      label: 'Request Confirmation',
      letterType: LetterTypes.COB_LETTER
    };
    component.cobRequest = requestPgData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
