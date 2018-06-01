import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfDeclarationComponent } from './self-declaration.component';
import { FPCareFormFooterComponent } from '../../core/form-footer/form-footer.component';
import { FPCareToggleComponent } from '../../core//toggle/toggle.component';
import { FileUploaderComponent } from '../../core/file-uploader/file-uploader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { StickyModule } from 'ng2-sticky-kit';


describe('SelfDeclarationComponent', () => {
  let component: SelfDeclarationComponent;
  let fixture: ComponentFixture<SelfDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ModalModule.forRoot(), RouterTestingModule, StickyModule],
      declarations: [ SelfDeclarationComponent, FPCareFormFooterComponent, FPCareToggleComponent, FileUploaderComponent ],
      providers: [ApplicantDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
