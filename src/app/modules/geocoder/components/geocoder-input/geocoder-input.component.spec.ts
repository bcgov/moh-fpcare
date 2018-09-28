import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocoderInputComponent } from './geocoder-input.component';

describe('GeocoderInputComponent', () => {
  let component: GeocoderInputComponent;
  let fixture: ComponentFixture<GeocoderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeocoderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocoderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
