import { HomeComponent } from './';

describe('HomeComponent', () => {
  const mockAppId = 'mock-app-id';
  const sampleDataUrl = '/assets/sample.json';
  const sampleData = {
    console: 'mock console data',
    page: 'mock page data',
  };
  let component;

  mockConsole();

  beforeEach(() => {
    component = new HomeComponent(mockAppId);
  });

  const getElementHTML = () => {
    const element = document.getElementById(mockAppId);
    return element ? element.innerHTML : document.body.innerHTML;
  };

  describe('when no root element exists', () => {
    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done).catch();
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('does not set anything on the page', () => {
      expect(getElementHTML()).toBe('');
    });

    it('logs the console data', () => {
      // eslint-disable-next-line no-console
      expect(console.log.mock.calls).toHaveLength(1);
      // eslint-disable-next-line no-console
      expect(console.log.mock.calls[0]).toEqual([sampleData.console]);
    });
  });

  describe('when no errors occur', () => {
    createElement(document.body, 'div', { id: mockAppId });

    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done).catch();
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('sets the page data correctly', () => {
      expect(getElementHTML()).toBe(sampleData.page);
    });

    it('logs the console data', () => {
      // eslint-disable-next-line no-console
      expect(console.log.mock.calls).toHaveLength(1);
      // eslint-disable-next-line no-console
      expect(console.log.mock.calls[0]).toEqual([sampleData.console]);
    });
  });

  const responseErrors = [403, 404, 500];

  const testResponseStatus = (statusCode) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      createElement(document.body, 'div', { id: mockAppId });

      beforeEach((done) => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        component.init().then(done).catch();
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('does not set anything on the page', () => {
        expect(getElementHTML()).toBe('');
      });

      it('does not log anything to the console', () => {
        // eslint-disable-next-line no-console
        expect(console.log.mock.calls).toHaveLength(0);
      });
    });
  };

  responseErrors.forEach(testResponseStatus);
});
