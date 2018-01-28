import { HomeComponent } from './';
import styles from './home.style';

jest.mock('./home.style', () => mockStyle(require.requireActual('./home.style')));

describe('HomeComponent', () => {
  const sampleDataUrl = `${VARIABLES.SERVICES.ASSETS}sample.json`;
  const sampleData = {
    text: 'Mock Content',
  };
  let component;

  beforeEach(() => {
    component = new HomeComponent();
  });

  const createComponent = done => component.init().then(done).catch();

  const querySelector = (selector) => {
    const classes = document.getElementsByClassName(selector);
    return (classes && classes.length) ? classes[0] : null;
  };

  describe('when no errors occur', () => {
    createElement(document.body, 'div', { id: VARIABLES.ROOTID });

    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      createComponent(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('fetches data from the correct url', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('shows the page content', () => {
      expect(querySelector(styles.content).innerHTML.trim())
        .toBe(`${VARIABLES.TITLE} says ${sampleData.text}!`);
    });

    it('shows the footer', () => {
      expect(querySelector(styles.footer).innerHTML.trim())
        .toBe(`v${VARIABLES.VERSION}-${VARIABLES.ENVIRONMENT}`);
    });
  });

  const testResponseStatus = (statusCode) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      createElement(document.body, 'div', { id: VARIABLES.ROOTID });

      beforeEach((done) => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        createComponent(done);
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('does not show the page content', () => {
        expect(querySelector(styles.content)).toBe(null);
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

    it('does not show the page content', () => {
      expect(querySelector(styles.content)).toBe(null);
    });
  });
});
