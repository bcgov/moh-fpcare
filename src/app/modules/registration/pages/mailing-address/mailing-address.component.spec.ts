import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingAddressPageComponent } from './mailing-address.component';
import { CoreModule } from '../../../core/core.module';

describe('MailingAddressComponent', () => {
  let component: MailingAddressPageComponent;
  let fixture: ComponentFixture<MailingAddressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingAddressPageComponent ],
      imports: [ CoreModule ]
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
});
