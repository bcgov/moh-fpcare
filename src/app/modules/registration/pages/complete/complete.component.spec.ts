import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePageComponent } from './complete.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {FormsModule} from '@angular/forms';

fdescribe('CompleteComponent', () => {
  let component: CompletePageComponent;
  let fixture: ComponentFixture<CompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompletePageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FPCareDataService, fPCareDataServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
