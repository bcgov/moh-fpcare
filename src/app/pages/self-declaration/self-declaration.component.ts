import { Component, OnInit, ChangeDetectorRef, HostListener, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Applicant } from '../../models/applicant.model';
import { Base } from '../../core/base/base.class';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-self-declaration',
  templateUrl: './self-declaration.component.html',
  styleUrls: ['./self-declaration.component.scss']
})
export class SelfDeclarationComponent extends Base implements OnInit, AfterViewChecked {
  public applicant: Applicant;
  public viewHeight: number;
  public disableSticky = false;
  public stickyZIndex = 10;
  @ViewChild('declarationQuestions') declarationQuestions: ElementRef;
  @ViewChild('uploadSection') uploadSection: ElementRef;


  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    private applicantData: ApplicantDataService) {
    super();
    this.applicant = applicantData.applicant;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.stickyZIndex = (this.stickyZIndex === 10 ? 9 : 10);
    const offset = (this.stickyZIndex === 10 ? 1 : 0);

    //We want to constantly toggle the height of viewHeight here, to force sticky to update itself. So, we alternate it by 1px.
    this.viewHeight = this.declarationQuestions.nativeElement.offsetHeight + offset;
    this.changeRef.detectChanges();

  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['user-acceptance']);
  }

  back(): void {
    this.router.navigate(['contact-info']);
  }

}
