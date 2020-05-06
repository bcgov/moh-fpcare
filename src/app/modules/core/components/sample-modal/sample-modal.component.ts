import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Base } from 'moh-common-lib/models';
import {ImageInterface} from '../../../../models/image-interface';

@Component({
  selector: 'fpcare-sample-modal',
  templateUrl: './sample-modal.component.html',
  styleUrls: ['./sample-modal.component.scss']
})
export class SampleModalComponent extends Base implements OnInit {

  @Input() title: string;
  @Input() images: ImageInterface[] = [];

  @ViewChild('samplesModal', { static: true }) public samplesModal: ModalDirective;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public openModal(): void {
    this.samplesModal.show();
  }

  public closeModal(): void {
    this.samplesModal.hide();
  }
}
