import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardProgressBarComponent } from './wizard-progress-bar.component';
import { AlertModule, ProgressbarModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('WizardProgressBarComponent', () => {
  let component: WizardProgressBarComponent;
  let fixture: ComponentFixture<WizardProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardProgressBarComponent ],
      imports: [AlertModule.forRoot(), ProgressbarModule.forRoot(), RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
