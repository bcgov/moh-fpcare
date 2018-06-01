import { Component, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Base } from '../base/base.class';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { ConsentModalContent } from './content/consent-modal-content.component';

@Component({
  selector: 'fpcare-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent extends Base {
  bsModalRef: BsModalRef;
  agreeCheck: boolean;
  @ViewChild('informationCollectionModal') public informationCollectionModal: ModalDirective;

  @Output() onConsented = new EventEmitter<boolean>();


  constructor(private modalService: BsModalService) {
    super();
  }

  public openModal(): void {
    this.informationCollectionModal.show();
  }

  public closeModal(): void {
    this.informationCollectionModal.hide();
    this.onConsented.emit(true);
  }



}
