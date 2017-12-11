import { HomeComponent } from './';
import styles from './home.style';

describe('HomeComponent', () => {
  const rootId = 'mock-app-id';
  const sampleDataUrl = `${VARIABLES.SERVICES.ASSETS}sample.json`;
  const sampleData = {
    text: 'Mock Text',
  };
  let component;

  beforeEach(() => {
    component = new HomeComponent(rootId);
  });

  const createComponent = done => component.init().then(done).catch();

  const querySelector = (selector) => {
    const classes = document.getElementsByClassName(selector);
    return (classes && classes.length) ? classes[0] : null;
  }

  describe('when no errors occur', () => {
    createElement(document.body, 'div', { id: rootId });

    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      createComponent(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('sets the page text', () => {
      expect(querySelector(styles.page).innerHTML.trim())
        .toBe(`${VARIABLES.TITLE} says ${sampleData.text}!`);
    });

    it('has the footer', () => {
      expect(querySelector(styles.footer).innerHTML.trim())
        .toBe(`v${VARIABLES.VERSION} (${VARIABLES.ENVIRONMENT})`);
    });
  });

  const testResponseStatus = (statusCode) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      createElement(document.body, 'div', { id: rootId });

      beforeEach((done) => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        createComponent(done);
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('does not set anything on the page', () => {
        expect(querySelector(styles.page)).toBe(null);
      });
    });
  };

  [403, 404, 500].forEach(testResponseStatus);

  describe('when no root element exists', () => {
    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      createComponent(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('does not set anything on the page', () => {
      expect(querySelector(styles.page)).toBe(null);
    });
  });
});
