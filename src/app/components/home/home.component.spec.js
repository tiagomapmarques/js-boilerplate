import { HelperService } from 'services';

import { HomeComponent } from './home.component';
import style from './home.style';

jest.mock('services', () => ({
  HelperService: {
    getJson: jest.fn(),
    writeToDocumentById: jest.fn(),
  },
}));

jest.mock('./home.style', () => global.mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleData = { text: 'Mock Content' };
  let component;

  beforeEach(() => {
    component = new HomeComponent(VARIABLES.ROOTID);
  });

  afterEach(() => {
    HelperService.writeToDocumentById.mockReset();
  });

  const createComponent = done => component.create().then(done).catch();

  const querySelector = (selector) => {
    const [[, innerHTML]] = HelperService.writeToDocumentById.mock.calls;
    document.body.innerHTML = innerHTML;
    return document.body.querySelector(selector);
  };

  describe('no errors occur fetching', () => {
    beforeEach((done) => {
      HelperService.getJson = jest.fn(() => new Promise(resolve => resolve(sampleData)));
      createComponent(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('fetches data from the correct url', () => {
      expect(HelperService.getJson.mock.calls).toHaveLength(1);
      expect(HelperService.getJson.mock.calls[0][0]).toEqual('sample');
    });

    it('shows the page content', () => {
      expect(querySelector(`.${style.content}`).innerHTML.trim())
        .toBe(`${VARIABLES.TITLE} says ${sampleData.text}!`);
    });

    it('shows the footer', () => {
      expect(querySelector(`.${style.footer}`).innerHTML.trim())
        .toBe(`v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}`);
    });
  });

  describe('an error occurs fetching', () => {
    beforeEach((done) => {
      HelperService.getJson = jest.fn((_, data) => new Promise(resolve => resolve(data)));
      createComponent(done);
    });

    it('does not show content', () => {
      expect(querySelector(`.${style.content}`)).toBe(null);
    });
  });
});
