// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  useDummyData: true,
  modChecksOn: false,
  
  /** Base url for all API requests. Note: This should be a relative URL, not absolute, so it can properly map to dev/test/prod. */
  baseAPIUrl: 'https://reqres.in/api/',

  loggingURL: 'https://reqres.in/api/',

  /** Log HTTP requests from our API and Log services into the console */
  logHTTPRequestsToConsole: true,
  

};
