import { HelperService } from 'services';

import { HomeComponent } from '.';
import style from './home.style';

jest.mock('services', () => ({
  HelperService: {
    getJson: jest.fn(),
    naiveRender: jest.fn(),
  },
}));

jest.mock('./home.style', () => global.mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleData = { text: 'Mock Content' };
  let component;

  beforeEach(() => {
    component = new HomeComponent();
  });

  afterEach(() => {
    HelperService.naiveRender.mockReset();
  });

  const createComponent = (done) => component.create().then(done).catch();

  const querySelector = (selector) => {
    const [[, innerHTML]] = HelperService.naiveRender.mock.calls;
    document.body.innerHTML = innerHTML;
    return document.body.querySelector(selector);
  };

  const mockGetJson = (newData = null) => jest
    .fn((_, data) => new Promise((resolve) => resolve(newData === null ? data : newData)));

  describe('no errors occur fetching', () => {
    beforeEach((done) => {
      HelperService.getJson = mockGetJson(sampleData);
      createComponent(done);
    });

    it('fetches data from the correct url', () => {
      expect(HelperService.getJson.mock.calls).toHaveLength(1);
      expect(HelperService.getJson.mock.calls[0][0]).toEqual('sample');
    });

    it('shows the page content', () => {
      expect(querySelector(`.${style.content}`).textContent.trim())
        .toBe(`${PROJECT.TITLE} says ${sampleData.text}!`);
    });

    it('shows the footer', () => {
      expect(querySelector(`.${style.footer}`).textContent.trim())
        .toBe(`v${PROJECT.VERSION}-${ENVIRONMENT}`);
    });
  });

  describe('an error occurs fetching', () => {
    beforeEach((done) => {
      HelperService.getJson = mockGetJson();
      createComponent(done);
    });

    it('does not show content', () => {
      expect(querySelector(`.${style.content}`)).toBe(null);
    });
  });
});
