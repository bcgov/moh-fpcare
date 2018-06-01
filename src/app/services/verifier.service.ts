import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";


@Injectable()
export class VerifierService {


  private _enrollmentViewTypeSelector  = "All";
  set enrollmentViewTypeSelector(type: string){
    this._enrollmentViewTypeSelector = type;
    this.viewTypeSubject.next(type);
  }


  public $enrollmentViewType: Observable<string>;
  private viewTypeSubject: Subject<string>;

  constructor() {
    this.viewTypeSubject = new Subject<string>();
    this.$enrollmentViewType = this.viewTypeSubject.asObservable();
  }

}
