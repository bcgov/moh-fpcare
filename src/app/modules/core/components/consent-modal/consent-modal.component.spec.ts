import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentModalComponent } from './consent-modal.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
// import {ApiService} from '../../../../services/api-service.service';
import {CaptchaComponent} from 'mygovbc-captcha-widget/src/app/captcha/captcha.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
// import {CaptchaDataService} from 'mygovbc-captcha-widget/src/app/captcha-data.service';


describe('ConsentModalComponent', () => {
  let component: ConsentModalComponent;
  let fixture: ComponentFixture<ConsentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
          ConsentModalComponent,
          CaptchaComponent
      ],
      providers: [
          BsModalService,
          FPCareDataService,
          ApiService,
          CaptchaDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
