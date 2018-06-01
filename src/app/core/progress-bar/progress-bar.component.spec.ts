import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { Router } from '@angular/router';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
      imports: [RouterTestingModule],
      declarations: [ ProgressBarComponent ],

      // providers: [{ provide: Router, useClass: MockRouter}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // Can't easily test active(), because mocking the routes is difficult.

  it('should have the later routes be in-active', () => {
    expect(component.isAfterActive(component.progressBarList[1])).toBe(true);
    expect(component.isAfterActive(component.progressBarList[2])).toBe(true);
    expect(component.isAfterActive(component.progressBarList[3])).toBe(true);
  });

});
