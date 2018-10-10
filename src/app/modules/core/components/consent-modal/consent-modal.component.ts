import {Component, ViewChild, EventEmitter, Output, OnInit} from '@angular/core';
import { Base } from '../base/base.class';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {environment} from '../../../../../environments/environment';
import {ApiService} from '../../../../services/api-service.service';

@Component({
  selector: 'fpcare-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent extends Base implements OnInit {

  public agreeCheck: boolean = false;

  public captchaApiBaseUrl;
  private _hasToken = false;

  @ViewChild('informationCollectionModal') public informationCollectionModal: ModalDirective;

  @Output() onConsented = new EventEmitter<boolean>();

  constructor( private apiService: ApiService ) {
    super();
  }

  ngOnInit() {
    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
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

  /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
  get nonce(): string {
    return this.objectId;
  }

  setToken(token): void {
    this._hasToken = true;
    this.apiService.setCaptchaToken(token);
  }

  canContinue(): boolean {
    return this.agreeCheck && this._hasToken;
  }

}

