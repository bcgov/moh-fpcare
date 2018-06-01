import {
  Directive, ElementRef, Input, HostListener, HostBinding, Renderer2, Inject,
  ViewContainerRef, ChangeDetectorRef, ComponentRef, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';


import { ValidationComponent } from './validation-component.interface';
import { RequiredValidationErrorsComponent } from './required-validation/required-validation.component';
import { PhoneValidationComponent } from './phone-validation/phone-validation.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';


/**
 * Validate a **single** <input>, and specify validation options via a comma
 * separated list. Also requires that a <label for="name"> matches the input.
 *
 * Example:
 * ```
 *    <div class="form-group" fpcareRequired="required,phone">
 * ```
 *
 * A list of all options can be found in `loadValidationComponents()`
 *
 * If you wish to write your own validation, you'll have to extend
 * base-validation.component.ts, and then add your class + option
 * to `loadValidationComponents()`
 */
@Directive({
  selector: '[fpcareRequired]'
})
export class FPCareRequiredDirective implements AfterViewInit {
  private el: ElementRef;
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
    @Inject(ComponentFactoryResolver) factoryResolver,
    private ref: ChangeDetectorRef) {
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

        case 'phone':
          this.validationComponents.push(PhoneValidationComponent);
          break;

        case 'email':
          this.validationComponents.push(EmailValidationComponent);
          break;

        default:
          break;
      }
    });
  }

  @HostListener('keyup')
  @HostListener('blur')
  onKey() {
    this.validationComponents.forEach(this.runValidationComponent.bind(this));
  }

  /** Runs the logic of a given validation component */
  private runValidationComponent(validationComponent: ValidationComponent): void {
    if (!validationComponent.validate(this.input)) {
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
    if (this.activeComponents[validationComponent.name] == null) {
      return;
    }

    this.activeComponents[validationComponent.name].destroy();
    this.activeComponents[validationComponent.name] = null;

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

  /** Returns the div.form-group parent, which _should_ be the direct parent. */
  private get formGroupElement(): ElementRef {
    const parent = this.input.nativeElement.parentElement;
    if (parent.classList.contains('form-group')) {
      return parent;
    }
    //Extend this function as required to find .form-group, but keep DOM operations at a minimum.
    throw new Error('FPCareRequiredDirective unable to find the parent .form-group element');
  }

  /** Creates a component and adds it to the view. */
  private addComponent<T extends ValidationComponent>(componentClass): ComponentRef<T> {
    //Max 1 instance of each component type, to stop duplicate messages.
    if (this.activeComponents[componentClass.name]) {
      return;
    }
    const component = this.prepareComponent(componentClass);
    this.insertComponent(component);
    this.activeComponents[componentClass.name] = component;
    return component as ComponentRef<T>;
  }

  /** Creates a component but does not add it to the view */
  private prepareComponent<T extends ValidationComponent>(componentClass): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory(componentClass);
    const component = factory.create(this.view.parentInjector) as ComponentRef<T>;
    // (component.instance as ValidationComponent).fieldName = this.labelText;
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
    this.label = new ElementRef(document.querySelector(`[for="${this.input.nativeElement.name}"]`));

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
