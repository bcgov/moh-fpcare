import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ImageInterface} from '../../../../models/image-interface';
import {SampleModalComponent} from '../sample-modal/sample-modal.component';

@Component({
  selector: 'fpcare-phn-definition',
  templateUrl: './phn-definition.component.html',
  styleUrls: ['./phn-definition.component.scss']
})
export class PhnDefinitionComponent implements OnInit {
  @Input() driverLicense: boolean = true;

  @ViewChild('bcscSample') bcscSample: SampleModalComponent;

  constructor() { }

  ngOnInit() {
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

  get imageList(): ImageInterface[] {

    if (this.driverLicense) {
      return [
        {path: 'assets/bcsc_sample_front.png', desc: 'BC Service Card Sample Front image'},
        {path: 'assets/bcsc_sample_back.png', desc: 'BC Service Card Sample Back image'}
      ];
    }
    return [
      {path: 'assets/no_photo_bcsc_sample_front.png', desc: 'No Photo BC Service Card Sample Front image'},
      {path: 'assets/no_photo_bcsc_sample_back.png', desc: 'No Photo BC Service Card Sample Back image'}
    ];
  }
}
