# Ministry of Health of the Province of British Columbia - Fair PharmaCare 
PharmaCare Revisions for Information Management Enhancements

PharmaCare used [angular-scaffold](https://github.com/bcgov/angular-scaffold) as it's starting off point.  The original angular-scaffold readme can be found in `angular-scaffold-readme.md`.

## Setup

### Prerequisites

1. angular-cli `npm i -g @angular/cli`
2. Node 8.1.x or greater (recommended: 8.9.4+)

Verify angular-cli is installed by running `ng -v`. Since `ng -v` is dependent upon the folder it's executed in (i.e. it looks in `node_modules/`), it's fine if some of the fields show "error." 

### Installation

```bash
git clone https://github.com/bcgov/moh-fpcare
cd mod-fpcare
npm install
npm run dev # Runs a local dev server
```


## Testing

This app has both unit tests and e2e tests written. At the time of this writing, all tests are passing.

```bash
npm run test # Runs `ng test`
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
<fpcare-page-framework layout='single'>

  <fpcare-form-action-bar
    [canContinue]="canContinue()"
    (click)="continue()"
  ></fpcare-form-action-bar>
</fpcare-page-framework>
```

### Dates

Please use SimpleDate for all dates within code so that we do not encounter conversion issues between Date & SimpleDate.
Date module uses SimpleDate.