import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RequestTemplateComponent} from './request-template.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DummyDataService} from '../../../../services/dummy-data.service';

const dummyDataService = new DummyDataService();

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
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTemplateComponent);
    component = fixture.componentInstance;
    component.applicant = dummyDataService.createAdult();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
