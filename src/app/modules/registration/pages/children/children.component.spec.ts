import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildrenPageComponent } from './children.component';
import { CoreModule } from '../../../core/core.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ValidationService} from '../../../../services/validation.service';
import {RegistrationService} from '../../registration.service';

describe('ChildrenComponent', () => {
  let component: ChildrenPageComponent;
  let fixture: ComponentFixture<ChildrenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildrenPageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        FPCareDataService,
        ValidationService,
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can continue by default (no children)', () => {
    expect(component.canContinue()).toBeTruthy();
  });

  it('cannot continue by default (has child)', () => {
    component.addChild();
    expect(component.canContinue()).toBeFalsy();
  });
});
