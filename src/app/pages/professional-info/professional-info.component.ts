import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Applicant } from '../../models/applicant.model';
import { ConsentModalComponent } from '../../core/consent-modal/consent-modal.component';
import { Base } from '../../core/base/base.class';
import { Colleges, CollegeList } from '../../models/colleges.enum';
import { CollegeDataService } from '../../services/college-data.service';
import { AdvancedPracticeCerts } from '../../models/advanced-practice-certs.enum';


@Component({
  selector: 'fpcare-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent extends Base
implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild(ConsentModalComponent) private consentModal: ConsentModalComponent;
  @ViewChild('collegeNameContainer') private collegeNameContainer: ElementRef;
  @ViewChild('advancedPracticeCertContainer') private advancedPracticeCertContainer: ElementRef;

  public applicant: Applicant;
  public Colleges: typeof Colleges = Colleges;
  public showError = false;
  public collegeList: CollegeList[];

  /** Makes all the form inputs on professional info page readonly. */
  public readonly = false;

  constructor(
    private applicantData: ApplicantDataService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private router: Router,
    private collegeData: CollegeDataService) {
    super();
    this.applicant = applicantData.applicant;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.collegeList = this.defaultCollegeList();
    this.initSelect();
  }

  get advancedPracticeCertsList() {
    return [
      {
        id: 'none',
        text: AdvancedPracticeCerts.None,
      },
      {
        id: AdvancedPracticeCerts.RemotePractice,
        text: AdvancedPracticeCerts.RemotePractice,
      },
      {
        id: AdvancedPracticeCerts.ReproductiveCare,
        text: AdvancedPracticeCerts.ReproductiveCare,
      },
      {
        id: AdvancedPracticeCerts.SexuallyTransmittedInfections,
        text: AdvancedPracticeCerts.SexuallyTransmittedInfections
      }
    ];
  }

  onAdvancedPracticeCertChanged(value: AdvancedPracticeCerts[]): void {
    this.applicant.advancedPracticeCerts = this.enforceNoneSelect(value, this.advancedPracticeCertContainer);
  }

  onCollegeChange(value: Colleges[]): void {
    this.applicant.college = this.enforceNoneSelect(value, this.collegeNameContainer);
  }

  ngAfterViewInit() {
    if (!this.applicant.consentInfoCollection) {
      this.consentModal.openModal();
    }
  }

  onConsented(consent: boolean): void {
    this.applicant.consentInfoCollection = consent;
  }

  /**
   * Re-orders the selected elements in the Professional College multiselect
   * box. Now they will be ordered in the same order the user selects them. This
   * step is necessary in order for the code in onCollegeChange() to work, which
   * enforces business logic rules relating to selecting 'None'.
   */
  initSelect(): void {
    // COMMENTED OUT DUE TO REMOVAL OF JQUERY AND SELECT2 FROM BUILD.

    // $(this.elementRef.nativeElement).on('select2:select', 'select', function (evt: any) {
    //   const element = evt.params.data.element;
    //   const $element = $(element);

    //   $element.detach();
    //   $(this).append($element);
    //   $(this).trigger('change');
    // });

  }


  /**
   * Enforces business logic relating to selecting a "None" value when select2's
   * multiselect is enabled.  Ensures the user cannot both have items selected
   * as well as 'none'. If 'none' is selected, it will clear all other
   * results, and vice versa.
   *
   * This MUST be used in conjunction w/ initSelects() reordering, otherwise
   * detection will not work.
   * @param value The $event.value from <select2>'s (valueChanged)
   * @param el A parent element containing the <select2> element.
   * @returns {any} Same type[] as value. Potential modifications to array items.
   */
  enforceNoneSelect(value, element: ElementRef): any[] {
    const firstSelected = element.nativeElement.querySelectorAll('.select2-selection__rendered > li')[0].title;
    const isNoneInPreviousSelection = !(firstSelected.toLowerCase() === 'none');
    const isNoneInSelection = value.indexOf('none') >= 0;
    const onlyNoneSelected = value.length === 1 && isNoneInPreviousSelection;
    const otherOptionsSelected = (value.length >= 2 || (value.length === 1 && !isNoneInSelection));

    //Case: Have items, select 'None' -> clear and show 'None'
    if (isNoneInSelection && !isNoneInPreviousSelection && otherOptionsSelected) {
      return ['none'];
    }
    //Case: Have 'None', select items -> clear and show items.
    else if (isNoneInSelection && isNoneInPreviousSelection) {
      return value.filter(x => x.toLowerCase() !== 'none');
    }
    else {
      return value;
    }
  }

  defaultCollegeList(): CollegeList[] {
    return this.collegeData.defaultCollegeList();
  }

  /**
   * Takes the value of a College and returns the human readable text. Very
   * similar to CollegeDataService.getTextFromSelection(), but this function can
   * take a string literal as well as the Colleges value.
   *
   * @param collegeID A string value on the Colleges enum.
   */
  getCollegeNameFromID(collegeID: Colleges | string): string{
    return this.collegeData.getTextFromSelection([collegeID as Colleges]);
  }

  onChange(values: any) {
    console.log('professional-info onchange: ', values);
  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['site-access']);
  }

}
