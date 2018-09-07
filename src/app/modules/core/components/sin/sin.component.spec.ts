import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {SinComponent} from './sin.component';

fdescribe('SinComponent', () => {
  let component: SinComponent;
  let fixture: ComponentFixture<SinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinComponent ],
      imports: [ FormsModule, TextMaskModule ]
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
