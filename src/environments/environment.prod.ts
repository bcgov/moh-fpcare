export const environment = {
  production: true,
  useDummyData: false,
  useMockBackend: false,
  baseAPIUrl: '/fpcare/api/fpcareIntegration/rest/',
  captchaApiBaseUrl: '/fpcare/api/captcha',
  loggingURL: '/fpcare/api/logging',
  envServerUrl: '/fpcare/api/env',
  addressUrl: '/fpcare/api/address',
  logHTTPRequestsToConsole: false,
  bypassSplashPage: false,
  bypassGuards: false,
  promptOnExit: true,
  purgeWhenInactive: true,
  enableLogging: true,

  /** Link used in app */
  links: {
    FAQ: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan/frequently-asked-questions-about-registration-income-and-consent',
    FormularySearch: 'https://pharmacareformularysearch.gov.bc.ca/',
    HIBC: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/contact-us',
    MSP: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp',
    CRA: 'https://www.canada.ca/en/revenue-agency.html'
  }
};
