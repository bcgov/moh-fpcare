import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RequestConsentComponent} from './request-consent.component';
import {CoreModule} from '../../../core/core.module';
import {RequestTemplateComponent} from '../request-template/request-template.component';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {RouterTestingModule} from '@angular/router/testing';


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
        RouterTestingModule
      ],
      providers: [
        FPCareDataService,
        DummyDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
