import { Injectable } from '@angular/core';
import { Applicant } from '../models/applicant.model';

@Injectable()
export class ApplicantDataService {

  public applicant: Applicant;

  constructor() {
    this.createApplicant();
  }

  private createApplicant(): void {
    this.applicant = new Applicant();
  }

}
