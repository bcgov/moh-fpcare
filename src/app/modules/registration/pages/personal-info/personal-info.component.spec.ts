import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPageComponent } from './personal-info.component';
import { CoreModule } from '../../../core/core.module';

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoPageComponent;
  let fixture: ComponentFixture<PersonalInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInfoPageComponent ],
      imports: [ CoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
