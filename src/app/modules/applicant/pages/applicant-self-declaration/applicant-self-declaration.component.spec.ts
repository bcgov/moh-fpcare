import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSelfDeclarationComponent } from './applicant-self-declaration.component';

describe('ApplicantSelfDeclarationComponent', () => {
  let component: ApplicantSelfDeclarationComponent;
  let fixture: ComponentFixture<ApplicantSelfDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantSelfDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSelfDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
