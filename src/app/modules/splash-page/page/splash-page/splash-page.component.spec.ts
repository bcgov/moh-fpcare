import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashPageComponent } from './splash-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PageFrameworkComponent} from '../../../core/components/page-framework/page-framework.component';

describe('SplashPageComponent', () => {
  let component: SplashPageComponent;
  let fixture: ComponentFixture<SplashPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SplashPageComponent,
        PageFrameworkComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
