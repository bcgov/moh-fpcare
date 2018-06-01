import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPCareFormFooterComponent } from './form-footer.component';

describe('FPCareFormFooterComponent', () => {
  let component: FPCareFormFooterComponent;
  let fixture: ComponentFixture<FPCareFormFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPCareFormFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPCareFormFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
