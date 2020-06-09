// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  useDummyData: false,
  useMockBackend: false,

  /** Base url for all API requests. Note: This should be a relative URL, not absolute, so it can properly map to dev/test/prod. */
  baseAPIUrl: '/fpcare/api/fpcareIntegration/rest/',
  /** URL for log service */
  loggingURL: '/fpcare/api/logging',
  /** The URL that we supply to the MyGovBC-CAPTCHA-Widget */
  captchaApiBaseUrl: '/fpcare/api/captcha',
  /** Url used for spa-env server, where we get splash screen info. */
  envServerUrl: '/fpcare/api/env',
  /** Url used for address-validator service. */
  addressUrl: '/fpcare/api/address',

  /** console.log() HTTP requests from our API and Log services */
  logHTTPRequestsToConsole: true,

  /** Do not trigger guards */
  bypassGuards: true,

  /** Bypass maintenance mode / splash page. */
  bypassSplashPage: false,

  /** The user is shown a 'Are you sure you want to leave?' prompt when trying to navigate away or close the browser. */
  promptOnExit: false,

  /** Detect if user has been active for 3 hours and then force a refresh to purge local stage. */
  purgeWhenInactive: false,

  /** Should logs be sent to Splunk? If false, no logs are made. */
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
