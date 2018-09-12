import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule, ControlContainer, NgForm} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {SinComponent} from './sin.component';

describe('SinComponent', () => {
  let component: SinComponent;
  let fixture: ComponentFixture<SinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinComponent ],
      imports: [ FormsModule, TextMaskModule ],
      providers: [ NgForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
