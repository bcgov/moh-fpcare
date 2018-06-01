import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '../../core/base/base.class';
import { Applicant } from '../../models/applicant.model';
import { ApplicantDataService } from '../../services/applicant-data.service';
import { Colleges } from '../../models/colleges.enum';
import { NamedCollection } from '../../models/named-collections.interface';
import { DummyDataService } from '../../services/dummy-data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-site-access',
  templateUrl: './site-access.component.html',
  styleUrls: ['./site-access.component.scss']
})
export class SiteAccessComponent extends Base implements OnInit {
  public applicant: Applicant;
  public Colleges: typeof Colleges = Colleges;
  public tableData: NamedCollection[] = [];

  tableSettings: any = {

    columns: {
      namedCollection: {
        title: 'Named Collection of Sites',
        class: 'nowrap',
      },
      siteName: {
        title: 'Site Name'
      },
      city: {
        title: 'City',
        width: '110px',
      },
      postal: {
        title: 'Postal Code',
        width: '90px',
        class: 'nowrap',
      },
      vendor: {
        title: 'Vendor'
      },
      siteType: {
        title: 'Site Type'
      }
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    }

  };

  constructor(private router: Router,
    private dataStore: ApplicantDataService,
    private dummyData: DummyDataService) {
    super();
    this.applicant = this.dataStore.applicant;
    if (environment.useDummyData) {
      // this.tableData = dummyData.generateNamedCollections(20);
    }
    this.applicant.namedCollections = this.tableData;
   }

  ngOnInit() {
  }

  canContinue(): boolean {
    return true;
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['contact-info']);
  }

  back(): void {
    this.router.navigate(['professional-info']);
  }



}
