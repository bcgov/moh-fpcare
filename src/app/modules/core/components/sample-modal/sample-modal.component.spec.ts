import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleModalComponent } from './sample-modal.component';

describe('SampleModalComponent', () => {
  let component: SampleModalComponent;
  let fixture: ComponentFixture<SampleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
