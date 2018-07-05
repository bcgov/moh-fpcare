import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityPageComponent } from './eligibility.component';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('EligibilityComponent', () => {
  let component: EligibilityPageComponent;
  let fixture: ComponentFixture<EligibilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityPageComponent ],
      imports: [ CoreModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
