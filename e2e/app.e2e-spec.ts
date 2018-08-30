import { CflAppPage } from './app.po';

describe('cfl-app App', () => {
  let page: CflAppPage;

  beforeEach(() => {
    page = new CflAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
