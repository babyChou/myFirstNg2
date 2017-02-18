import { MyFirstNg2Page } from './app.po';

describe('my-first-ng2 App', () => {
  let page: MyFirstNg2Page;

  beforeEach(() => {
    page = new MyFirstNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
