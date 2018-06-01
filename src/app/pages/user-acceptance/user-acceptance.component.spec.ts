import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceptanceComponent } from './user-acceptance.component';
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { FPCareToggleComponent } from '../../core/toggle/toggle.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserAcceptanceComponent', () => {
  let component: UserAcceptanceComponent;
  let fixture: ComponentFixture<UserAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ UserAcceptanceComponent, FPCareFormFooterComponent, FPCareToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
