import {Component, ViewChild, EventEmitter, Output} from '@angular/core';
import { Base } from '../base/base.class';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fpcare-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent extends Base {

  agreeCheck: boolean = false;
  @ViewChild('informationCollectionModal') public informationCollectionModal: ModalDirective;

  @Output() onConsented = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  public openModal(): void {
    this.informationCollectionModal.config.keyboard = false;
    this.informationCollectionModal.config.backdrop = true;
    this.informationCollectionModal.config.ignoreBackdropClick = true;
    this.informationCollectionModal.show();
  }

  public closeModal(): void {
    this.informationCollectionModal.hide();
    this.onConsented.emit( this.agreeCheck );
  }
}
