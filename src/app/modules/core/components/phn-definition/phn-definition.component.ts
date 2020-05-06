import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ImageInterface} from '../../../../models/image-interface';
import {SampleModalComponent} from '../sample-modal/sample-modal.component';
import { Base } from 'moh-common-lib/models';

@Component({
  selector: 'fpcare-phn-definition',
  templateUrl: './phn-definition.component.html',
  styleUrls: ['./phn-definition.component.scss']
})
export class PhnDefinitionComponent extends Base implements OnInit {
  @Input() driverLicense: boolean = true;

  @ViewChild('bcscSample', { static: false }) bcscSample: SampleModalComponent;

  public imageList: ImageInterface[];

  constructor() {
    super();
  }

  ngOnInit() {

    if (this.driverLicense) {
      this.imageList = [
        {path: 'assets/bcsc_sample_back.png', desc: 'BC Service Card Sample Back image'},
        {path: 'assets/bcsc_sample_front.png', desc: 'BC Service Card Sample Front image'}
      ];
    } else {
      this.imageList = [
        {path: 'assets/no_photo_bcsc_sample_back.png', desc: 'No Photo BC Service Card Sample Back image'},
        {path: 'assets/no_photo_bcsc_sample_front.png', desc: 'No Photo BC Service Card Sample Front image'}
      ];
    }
  }

  openSample() {
    this.bcscSample.openModal();
  }

  get phnDefinition(): string {

    if (this.driverLicense) {
      return 'Personal Health Number (PHN) as shown on the back of your BC Services Card. ' +
          'This information may also be on your driver\'s license.';
    }
    return 'Personal Health Number (PHN) as shown on the back of your dependent child\'s BC Services Card.';
  }
}
