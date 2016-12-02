import { MyJobPage } from './app.po';

describe('my-job App', function() {
  let page: MyJobPage;

  beforeEach(() => {
    page = new MyJobPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
