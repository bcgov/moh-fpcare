import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCobComponent } from './request-cob.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RequestTemplateComponent} from '../request-template/request-template.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('RequestCobComponent', () => {
  let component: RequestCobComponent;
  let fixture: ComponentFixture<RequestCobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestCobComponent,
        RequestTemplateComponent,
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
    fixture = TestBed.createComponent(RequestCobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
