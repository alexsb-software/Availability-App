import { EventsAppPage } from './app.po';

describe('events-app App', function() {
  let page: EventsAppPage;

  beforeEach(() => {
    page = new EventsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
