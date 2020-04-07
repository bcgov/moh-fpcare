import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsFrameworkComponent } from './results-framework.component';
import { CoreModule } from '../../../core/core.module';

describe('ResultsFrameworkComponent', () => {
  let component: ResultsFrameworkComponent;
  let fixture: ComponentFixture<ResultsFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
