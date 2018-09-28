import { GeocoderModule } from './geocoder.module';

describe('GeocoderModule', () => {
  let geocoderModule: GeocoderModule;

  beforeEach(() => {
    geocoderModule = new GeocoderModule();
  });

  it('should create an instance', () => {
    expect(geocoderModule).toBeTruthy();
  });
});
