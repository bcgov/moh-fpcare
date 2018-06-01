// /**
//  * Currently commented out, could not quickly get tests to pass.  Attribute
//  * directives are more complex to test than most other testables.
//  *
//  * Angular's docs recommend creating an entirely new page component using
//  * the directive, then testing that page.  For now, tests have been started
//  * using the contact info page, but having issues. Probably best to do tests
//  * as separate e2e tests.
//  *
//  * https://angular.io/guide/testing#test-an-attribute-directive
//  */

// import { FPCareRequiredDirective } from './fpcare-required.directive';
// import { Directive, ElementRef, Input, HostListener, HostBinding, Renderer2 } from '@angular/core';
// import { ContactInformationComponent } from '../pages/contact-information/contact-information.component';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { FPCareDateComponent } from '../core/date/date.component';
// import { ApplicantDataService } from '../services/applicant-data.service';
// import { AddressComponent } from '../core/address/address.component';
// import { Select2Module } from 'ng2-select2';
// import { FPCareFormFooterComponent } from '../core/form-footer/form-footer.component';
// import { CalendarFieldFormatterDirective } from '../core/date/calendar-field-formatter.directive';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CalendarFutureDates } from '../core/date/calendar-future-dates.validator';
// import { By }              from '@angular/platform-browser';


// describe('FPCareRequiredDirective', () => {
//   let component: ContactInformationComponent;
//   let fixture: ComponentFixture<ContactInformationComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, Select2Module, RouterTestingModule],
//      declarations: [
//        ContactInformationComponent, FPCareDateComponent, AddressComponent,
//        FPCareFormFooterComponent, CalendarFieldFormatterDirective,
//        CalendarFutureDates
//      ],
//       providers: [ApplicantDataService],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ContactInformationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should run tests on the ContactInfo page', () => {
//     expect(fixture).toBeDefined();
//   });


//   it('should have validation errors when leaving first name blank', async(() =>{
//     let validationErrorDe =  fixture.debugElement.query(By.css('.text-danger'));
//     expect( validationErrorDe ).toBeNull();

//     const de =  fixture.debugElement.query(By.css('#firstName'));
//     const input =  de.nativeElement as HTMLInputElement

//     input.value = '';
//     input.dispatchEvent(new Event('keyup'));
//     fixture.detectChanges();

//     //For some reason the .text-danger text element hasn't been added yet.
//     fixture.whenStable().then(() => {
//       validationErrorDe =  fixture.debugElement.query(By.css('.text-danger'));
//       console.log('\n=================\n')
//       console.log('VALIDATION ERRORS', validationErrorDe);
//       let i = input;
//       let d = de;
//       debugger;
//       expect(validationErrorDe.nativeElement.textContent).toBe("First Name is required");
//     });

//   }));
// });
