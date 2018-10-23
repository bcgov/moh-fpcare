export enum ProvinceNames {
  AB = 'Alberta',
  BC = 'British Columbia',
  MB = 'Manitoba',
  NB = 'New Brunswick',
  NL = 'Newfoundland',
  NS = 'Nova Scotia',
  NT = 'Northwest Territories',
  NU = 'Nunavut',
  ON = 'Ontario',
  PE = 'Prince Edward Island',
  QC = 'Quebec',

  SK = 'Saskatchewan',
  YT = 'Yukon'
}

export enum CountryNames {
  CAN = 'Canada'
}

export const provinceList = Object.keys(ProvinceNames);
export const countryList = Object.keys(CountryNames);

export const defaultProv = provinceList.filter( x => {
  if ( ProvinceNames[x] === ProvinceNames.BC) {
    return x;
  }
})[0];

export const defaultCountry = countryList.filter( x => {
  if ( CountryNames[x] === CountryNames.CAN ) {
    return x;
  }
})[0];
