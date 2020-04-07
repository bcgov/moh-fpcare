# Ministry of Health of the Province of British Columbia - Fair PharmaCare

PharmaCare Revisions for Information Management Enhancements

PharmaCare used [angular-scaffold](https://github.com/bcgov/angular-scaffold) as it's starting off point. The original angular-scaffold readme can be found in `angular-scaffold-readme.md`.

## Setup

### Prerequisites

1. angular-cli `npm i -g @angular/cli`
2. Node 8.1.x or greater (recommended: 8.9.4+)

Verify angular-cli is installed by running `ng -v`. Since `ng -v` is dependent upon the folder it's executed in (i.e. it looks in `node_modules/`), it's fine if some of the fields show "error."

### Installation

```bash
git clone https://github.com/bcgov/moh-fpcare
cd moh-fpcare
npm install
npm run dev # Runs a local dev server
```

## Maitenance Mode / Splash Page

You need access to OpenShift to enable the splash page. It is controlled via env variables for the "spa-env-server" pod.

To enable the splash page:

1. Go to the correct OpenShift environment (e.g. dev/test/prod)
2. Applications > Deployments > spa-env-server
3. Environment tab
4. Set SPA_ENV_FPC_MAINTENANCE_START and SPA_ENV_FPC_MAINTENANCE_END

The spa-env-server will automatically set the maintence mode flag between these times.

You do not need to touch SPA_ENV_FPC_MAINTENANCE_FLAG. It can remain 'false', and the splsah page will still work.

SPA_ENV_FPC_MAINTENANCE_MESSAGE is an optional field. If anything is provided it will be displayed on the page below the default splash page. If it is empty, only the default page is shown with no custom message.

## Versioning Deployments

Prior to TEST and PROD builds you must update the version number. There are two npm scripts which do this: `npm run test-version` and `npm run prod-version`. These commands

1. increment the package version
2. commit the result
3. tag the new commit with the new version number

After you verify everything is correct, run `git push --follow-tags` to push the new tags to GitHub (or run `npm run push-version`).

As such, you should run these commands right before deploying a build and with a clean working directory (i.e. no changes that are uncommitted in git), otherwise they'll fail.

As this application is not a library/dependency it does not follow semver. Instead, version codes are as follows:

    test-version : 0.1.0 -> 0.2.0 .... 0.10.0 -> 0.11.0
    prod-version : 1.0.0 -> 2.0.0 .... 10.0.0 -> 11.0.0

`src/version.js` is called in the prebuild hook, prior to every `npm run build`. It puts version info into a generated file which is then console.log()'d out.

## Testing

This app has both unit tests and e2e tests written. The e2e tests are not running at this time due to an issue with private information and our ability to test it.

### To run unit tests

```bash
npm run test # Runs `ng test`
```

### To run e2e tests

```bash
npm run e2e # Runs `ng e2e`
```

## Linting

We use tslint for linting, the rules are set in `tslint.json`. Your IDE can be configured to use them (WebStorm does so automatically, VSCode requires an extension). You can also run the lint rules on the entire project with the followign command:

`ng lint`

## Application Details

### Pages

Most pages will use the page framework, and form pages will use the action bar.

Layouts can be: `single`, `double`, or `default`.

Anything in an `<aside></aside>` will appear in the right columns if they exist. In the single layout they just function as a normal div.

```html
<common-page-framework layout="single">
  <common-form-action-bar
    [canContinue]="canContinue()"
    (click)="continue()"
  ></common-form-action-bar>
</common-page-framework>
```

### Dates

Please use SimpleDate for all dates within code so that we do not encounter conversion issues between Date & SimpleDate.
Date module uses SimpleDate.

### Validation Module

The fpcareRequired directive takes comma delimited input. If no input added, then defaults to 'required'

Current validation for input:
required
phn-check
sin-check

```html
<div class="form-group">
  <label for="<input_id>">{Label Text}</label>
  <input
    class="form-control"
    id="<input_id - matches label 'for' value>"
    fpcareRequired="required,phn-check"
    ...
  />
</div>
```

### Style Class "todo"

This class is used to put notes in <aside> so that other developer's can see what is remaining on page or if issues are
encountered and require a solution that has not been identified.

These items are to be removed when development is complete.
