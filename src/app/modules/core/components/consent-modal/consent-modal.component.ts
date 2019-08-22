import {Component, ViewChild, EventEmitter, Output, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { Base } from 'moh-common-lib/models';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {environment} from '../../../../../environments/environment';
import {ApiService} from '../../../../services/api-service.service';
import {growVertical} from '../../../../animations/animations';

@Component({
  selector: 'fpcare-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss'],
  animations: [growVertical]
})
export class ConsentModalComponent extends Base implements OnInit {

  public captchaApiBaseUrl;
  public links = environment.links;

  private _agreeCheck: boolean = false;
  private _hasToken = false;

  @ViewChild('informationCollectionModal', { static: true }) public informationCollectionModal: ModalDirective;
  @ViewChild('agree', { static: true }) checkbox: ElementRef<HTMLInputElement>;

  @Output() onConsented = new EventEmitter<boolean>();

  constructor( private apiService: ApiService, private cd: ChangeDetectorRef ) {
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

  public modalShown(event){
    //Set focus on the checkbox
    this.checkbox.nativeElement.focus();
  }

  /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
  get nonce(): string {
    return this.objectId;
  }

  /**
   * Set the agreed flag
   * @param {boolean} val
   */
  set agreeCheck(val: boolean) {
    this._agreeCheck = val;

    if ( !val ) {
      this._hasToken = false;
    }
  }

  /**
   * Retrieve the agreed flag
   * @returns {boolean}
   */
  get agreeCheck(): boolean {
    return this._agreeCheck;
  }

  setToken(token): void {
    this._hasToken = true;
    this.apiService.setCaptchaToken(token);
  }

  canContinue(): boolean {
    return this.agreeCheck && this._hasToken;
  }

}

