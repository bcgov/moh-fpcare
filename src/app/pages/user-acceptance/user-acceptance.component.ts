import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '../../core/base/base.class';

@Component({
  selector: 'app-user-acceptance',
  templateUrl: './user-acceptance.component.html',
  styleUrls: ['./user-acceptance.component.scss']
})
export class UserAcceptanceComponent extends Base implements OnInit {

  constructor(private router: Router) {
    super();
   }

  ngOnInit() {
  }

  canContinue(): boolean {
    return true;
  }

  /**
   * Prompts the user to print out anything within the #print-section element.
   */
  print(): void {
    //https://stackoverflow.com/questions/41379274/print-html-template-in-angular-2-ng-print-in-angular-2
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  continue(): void {
    console.log('---------------\ncontinue');
    this.router.navigate(['review-submit']);
  }

  back(): void {
    this.router.navigate(['self-declaration']);
  }

}
