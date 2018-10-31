import {
  Directive, ElementRef, Input, HostListener, Renderer2, Inject,
  ViewContainerRef, ComponentRef, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';

import {ValidationComponent} from './validation-component.interface';
import {RequiredValidationErrorsComponent} from './required-validation/required-validation.component';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {PhnValidationComponent} from './phn-validation/phn-validation.component';
import {SinValidationComponent} from './sin-validation/sin-validation.component';
import {RegNumberValidationComponent} from './reg-number-validation/reg-number-validation.component';
import {PcValidationComponent} from './pc-validation/pc-validation.component';
import {NameValidationComponent} from './name-validation/name-validation.component';


/**
 * Validate a **single** <input>, and specify validation options via a comma
 * separated list. Also requires that a <label for="name"> matches the input.
 *
 * Example:
 * ```
 *    <div class="form-group">
 *      <input fpcareRequired="required,phone">
 * ```
 *
 * A list of all options can be found in `loadValidationComponents()`
 *
 * If you wish to write your own validation, you'll have to extend
 * base-validation.component.ts, and then add your class + option
 * to `loadValidationComponents()`
 */
@Directive({
  selector: '[fpcareRequired]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: FPCareRequiredDirective, multi: true
    }
  ]
})
export class FPCareRequiredDirective implements AfterViewInit, Validator {

  private input: ElementRef;
  private label: ElementRef;
  private view: ViewContainerRef;
  private factoryResolver: ComponentFactoryResolver;
  /** The CSS class to add to the element with the directive, i.e. form-group */
  private ERROR_CLASS = 'has-error';
  /** A list of all active validation components. Components are created/destroyed when validation fails/passes. */
  private activeComponents = {};

  /** A comma separated list of validation choices. Default: "required" */
  @Input('fpcareRequired') validationOptions: string;

  private validationComponents: ValidationComponent[] = [];

  constructor(input: ElementRef, private renderer: Renderer2,
    @Inject(ViewContainerRef) viewContainerRef,
    @Inject(ComponentFactoryResolver) factoryResolver) {
    this.input = input;
    this.view = viewContainerRef;
    this.factoryResolver = factoryResolver;
  }

  ngAfterViewInit() {
    if (!this.check(this.input)) {
      throw new Error(`Unable to initialize FPCareRequiredDirective. Directive \
      is unable to locate the input and labels. Make sure you have <label \
      for=\'NAME\'> setup correctly for the input with fpcareRequired.`);
    }
    this.validationOptions = this.validationOptions || 'required';
    this.loadValidationComponents();
  }

  /** Loads the validation components based off of directive input. Add future validation options here. */
  private loadValidationComponents() {
    this.validationOptions.replace(' ', '').split(',').forEach(opt => {

      switch (opt.toLowerCase()) {
        case 'required':
          this.validationComponents.push(RequiredValidationErrorsComponent);
          break;

        case 'phn-check':
          this.validationComponents.push(PhnValidationComponent);
          break;

        case 'sin-check':
          this.validationComponents.push(SinValidationComponent);
          break;

        case 'regnum-check':
          this.validationComponents.push(RegNumberValidationComponent);
          break;

        case 'postal-code':
          this.validationComponents.push(PcValidationComponent);
          break;

        case 'name-check':
          this.validationComponents.push(NameValidationComponent);
          break;

        default:
          break;
      }
    });
  }

  ngAfterViewChecked(){
    // If a component has the 'disabled' attribute on it we want to remove all error messages and have the element pass validation.
    const isDisabled = !!this.input.nativeElement.attributes.disabled;
    if (isDisabled){
      this.validationComponents.map(this.setValid.bind(this));
    }
  }

  /**
   * Main function. Runs all loaded validation components, shows errors, updates
   * form status.
   */
  runAll() {
    this.validationComponents.forEach(this.runValidationComponent.bind(this));
  }

  /**
   * We debounce all keyup events to stop validating as the user is still actively typing.
   */
  @HostListener('keyup')
  @debounce(500)
  onKey(){
    this.runAll();
  }

  /**
   * We validate on blur immediately. No debouncing.
   */
  @HostListener('blur')
  onBlur(){
    this.runAll();
  }

  /**
   * Validation the fields on page
   * Note: validate must be on the form
   * @param {AbstractControl} control
   * @returns {{[key: string]: any} | null}
   */
  validate(control: AbstractControl): {[key: string]: any} | null {

    /** An object matching the Angular spec of {validationError: false} for every failure. */
    const validationFailures: { [key: string]: boolean } = {};
    this.validationComponents.map(validationComponent => {
      const isInvalid = !validationComponent.validate(this.input);
      if (isInvalid){
        validationFailures[validationComponent.ERROR_STRING] = isInvalid;
      }
    });

    if (Object.keys(validationFailures).length){
      return validationFailures;
    }

    return null;
  }

  /** Runs the logic of a given validation component */
  private runValidationComponent(validationComponent: ValidationComponent) {

    if ( !validationComponent.validate(this.input) ) {
      this.setInvalid(validationComponent);
    }
    else {
      this.setValid(validationComponent);
    }
  }

  setInvalid(validationComponent) {
    this.renderer.addClass(this.formGroupElement, this.ERROR_CLASS);
    const comp = this.addComponent(validationComponent);
  }

  setValid(validationComponent) {
    if (this.activeComponents[validationComponent.ERROR_STRING] == null) {
      return;
    }

    this.activeComponents[validationComponent.ERROR_STRING].destroy();
    this.activeComponents[validationComponent.ERROR_STRING] = null;

    //Only remove class if there are no other active components.
    const componentsActive = Object.keys(this.activeComponents)
      .map(key => this.activeComponents[key])
      .filter(x => x !== null).length >= 1;

    if (!componentsActive) {
      this.renderer.removeClass(this.formGroupElement, this.ERROR_CLASS);
    }
  }

  private get inputVal() {
    return this.input.nativeElement.value;
  }

  private get labelText() {
    return this.label.nativeElement.textContent;
  }


  /**
   * Returns the div.form-group parent, which _should_ be the direct parent. It
   * will check grandparent as well, to handle cases where we use .input-groups,
   * e.g. for dollar signs.
   */
  private get formGroupElement(): ElementRef {
    const parent = this.input.nativeElement.parentElement;
    if (parent.classList.contains('form-group')) {
      return parent;
    }
    // Check for grand parent, necessary in cases where we use input-group as direct parent
    const grandParent = this.input.nativeElement.parentElement.parentElement;
    if (grandParent.classList.contains('form-group')){
      return grandParent;
    }


    //Extend this function as required to find .form-group, but keep DOM operations at a minimum.
    throw new Error('FPCareRequiredDirective unable to find the parent .form-group element');
  }

  /** Creates a component and adds it to the view. */
  private addComponent<T extends ValidationComponent>(componentClass): ComponentRef<T> {
    //Max 1 instance of each component type, to stop duplicate messages.
    if (this.activeComponents[componentClass.ERROR_STRING]) {
      return;
    }
    const component = this.prepareComponent(componentClass);
    this.insertComponent(component);
    this.activeComponents[componentClass.ERROR_STRING] = component;
    return component as ComponentRef<T>;
  }

  /** Creates a component but does not add it to the view */
  private prepareComponent<T extends ValidationComponent>(componentClass): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory(componentClass);
    const component = factory.create(this.view.parentInjector) as ComponentRef<T>;
    (component.instance as ValidationComponent).fieldName = this.labelText;

    return component;
  }

  /** Inserts an already created component into the view (c.f. prepareComponent()) */
  private insertComponent(component: ComponentRef<{}>) {
    this.view.insert(component.hostView);
  }


  /** Checks that fpcareRequired is attached to the right element and can identify the label. */
  private check(el: ElementRef): boolean {
    this.input = el;
    this.label = new ElementRef(this.input.nativeElement.previousElementSibling);

    if (this.input.nativeElement === null || this.label.nativeElement === null) {
      console.error('FPCareRequiredDirective cannot find require label.', {
         element: el,
         name: this.input.nativeElement.name
      });
      return false;
    }
    return true;
  }

}

// Debounce function decorator. If you need to use this elsewhere, refactor it into a different file.
export function debounce(delay: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout = null;

    const original = descriptor.value;

    descriptor.value = function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
