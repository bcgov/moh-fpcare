import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from './address.component';
// import MspDataService from '../../service/msp-data.service';
// import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
// import {MspProvinceComponent} from "../province/province.component";
// import {Ng2CompleterModule} from "ng2-completer";
// import {MspCountryComponent} from "../country/country.component";

describe('AddressComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent],
      imports: [FormsModule],
    });
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(AddressComponent);
    expect(fixture.componentInstance instanceof AddressComponent).toBe(true, 'should create AddressComponent');

  });
});
