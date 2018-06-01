import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniProgressBarComponent } from './mini-progress-bar.component';

describe('MiniProgressBarComponent', () => {
  let component: MiniProgressBarComponent;
  let fixture: ComponentFixture<MiniProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
