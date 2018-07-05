import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenPageComponent } from './children.component';
import { CoreModule } from '../../../core/core.module';

describe('ChildrenComponent', () => {
  let component: ChildrenPageComponent;
  let fixture: ComponentFixture<ChildrenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenPageComponent ],
      imports: [ CoreModule ]
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
});
