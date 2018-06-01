import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAccessComponent } from './site-access.component';
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { FPCareToggleComponent } from '../../core//toggle/toggle.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { DummyDataService } from '../../services/dummy-data.service';
import { environment} from '../../../environments/environment';

describe('SiteAccessComponent', () => {
  let component: SiteAccessComponent;
  let fixture: ComponentFixture<SiteAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SiteAccessComponent, FPCareFormFooterComponent, FPCareToggleComponent ],
      providers: [ApplicantDataService, DummyDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have dummy data when environment.useDummyData === true', () => {
    environment.useDummyData = true;
    fixture = TestBed.createComponent(SiteAccessComponent);
    component = fixture.componentInstance;
    expect(component.tableData.length).toBeTruthy();
  });

  it('should have an empty table when environment.useDummyData === false', () => {
    environment.useDummyData = false;
    fixture = TestBed.createComponent(SiteAccessComponent);
    component = fixture.componentInstance;
    expect(component.tableData.length).toEqual(0);
  });
});
