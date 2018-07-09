import {NgForm} from '@angular/forms';
import {AfterContentInit, DoCheck, QueryList, ViewChild} from '@angular/core';
import {UUID} from 'angular2-uuid';

/**
 * Base class - contains logic for determining whether the form is validated.
 * This does not handle the case of child forms.
 */
export class FormValidationBase implements DoCheck, AfterContentInit {

  /**
   * Flag to indicated whether form is valid.  e.g. validations for fields are successful
   * @type {boolean}
   * @private
   */
  protected _formValid = true;

  objectId: string = UUID.UUID().toString();

  @ViewChild('formRef') form: NgForm;

  ngAfterContentInit() {

    // Listen to NgForm members of this form
    const propertyNames = Object.getOwnPropertyNames(this);
    propertyNames.forEach((property: string) => {
      if (this[property] instanceof NgForm) {
        const form: NgForm = this[property];

        this._formValid = form.valid;

        form.valueChanges.subscribe(() => {
          this._formValid = form.valid;
        });
      }
    });
  }

  ngDoCheck() {
    console.log( 'Do check' );

    // Listen for children registering themselves
    const propertyNames = Object.getOwnPropertyNames(this);

    propertyNames.forEach((property: string) => {
      console.log( 'property', property );
      // If the child is a single instance
      if (this[property] instanceof FormValidationBase) {
        const child: FormValidationBase = this[property];
        console.log( 'child ', child );
      }
      // If the children is in a collection
      else if (this[property] instanceof QueryList) {
        const children: QueryList<FormValidationBase> = this[property];
        children.forEach((child: FormValidationBase) => {
          console.log( 'collection child ', child );
        });
      }
    });
  }
}
