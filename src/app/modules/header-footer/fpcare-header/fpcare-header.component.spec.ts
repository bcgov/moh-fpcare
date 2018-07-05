import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPCareHeaderComponent } from './fpcare-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FPCareHeaderComponent', () => {
  let component: FPCareHeaderComponent;
  let fixture: ComponentFixture<FPCareHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPCareHeaderComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPCareHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
