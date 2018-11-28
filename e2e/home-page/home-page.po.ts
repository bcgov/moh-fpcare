import { browser, element, by } from 'protractor';

/**
 * Functionality for all FPC pages
 */
export class HomePagePo {

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('h1')).getText();
  }
}
