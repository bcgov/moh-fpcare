import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhnDefinitionComponent } from './phn-definition.component';

describe('PhnDefinitionComponent', () => {
  let component: PhnDefinitionComponent;
  let fixture: ComponentFixture<PhnDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhnDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
