import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentModalComponent } from './consent-modal.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { CoreModule } from '../../../core/core.module';

describe('ConsentModalComponent', () => {
  let component: ConsentModalComponent;
  let fixture: ComponentFixture<ConsentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
      ],
      providers: [BsModalService, FPCareDataService],
    }).compileComponents();
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
