/**
 * Test home page - verify that e2e runs
 */
import {HomePagePo} from './home-page.po';

describe('HomePage', () => {
  let page: HomePagePo;

  beforeEach(() => {
    page = new HomePagePo();
  });

  it('should display home page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Home Page');
  });
});

