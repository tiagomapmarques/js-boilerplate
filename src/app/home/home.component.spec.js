import { HomeComponent } from './';
import { Logger } from 'logger';

jest.mock('logger');

describe('HomeComponent', () => {
  const mockAppId = 'mock-app-id';
  const sampleData = {
    page: 'mock page data',
    console: 'mock console data',
  };
  const fetchResponseError = 'Cannot fetch resource';
  let component;

  mockConsole();

  const getElementHTML = () => {
    const element = document.getElementById(mockAppId);
    return element ? element.innerHTML : document.body.innerHTML;
  };

  beforeEach(() => {
    Logger.catch = jest.fn(() => Logger.catch);
    component = new HomeComponent(mockAppId);
  });

  afterEach(() => {
    Logger.catch.mockReset();
  });

  describe('when no root element exists', () => {
    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual(['/assets/sample.json']);
    });

    it('does not set anything on the page', () => {
      expect(getElementHTML()).toBe('');
    });

    it('logs the console data', () => {
      expect(console.log.mock.calls).toHaveLength(1); // eslint-disable-line no-console
      expect(console.log.mock.calls[0]).toEqual([sampleData.console]); // eslint-disable-line no-console
    });
  });

  describe('when no errors occur', () => {
    createElement(document.body, 'div', { id: mockAppId });

    beforeEach((done) => {
      fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual(['/assets/sample.json']);
    });

    it('sets the page data correctly', () => {
      expect(getElementHTML()).toBe(sampleData.page);
    });

    it('logs the console data', () => {
      expect(console.log.mock.calls).toHaveLength(1); // eslint-disable-line no-console
      expect(console.log.mock.calls[0]).toEqual([sampleData.console]); // eslint-disable-line no-console
    });
  });

  describe('when fetch throws an error', () => {
    let thrownError;

    createElement(document.body, 'div', { id: mockAppId });

    beforeEach(() => {
      thrownError = new Error('no error thrown');
      fetch.mockImplementation(() => { throw new Error('fetch'); });
      try {
        component.init();
      } catch (error) {
        thrownError = error;
      }
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('thows the fetch error', () => {
      expect(thrownError).toEqual(new Error('fetch'));
    });

    it('does not set anything on the page', () => {
      expect(getElementHTML()).toBe('');
    });

    it('does not log anything to the console', () => {
      expect(console.log.mock.calls).toHaveLength(0); // eslint-disable-line no-console
    });
  });

  const responseErrors = [
    {
      statusCode: 404,
      statusError: new Error(fetchResponseError),
    },
    {
      statusCode: 500,
      statusError: new Error(fetchResponseError),
    },
  ];

  const testResponseStatus = (statusCode, statusError) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      createElement(document.body, 'div', { id: mockAppId });

      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        component.init();
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('processes Logger#catch error once', () => {
        // calls #catch twice and processes an error once
        expect(Logger.catch.mock.calls).toHaveLength(3);
      });

      it('logs the custom error', () => {
        expect(Logger.catch.mock.calls[2]).toEqual([statusError]);
      });

      it('does not set anything on the page', () => {
        expect(getElementHTML()).toBe('');
      });

      it('does not log anything to the console', () => {
        expect(console.log.mock.calls).toHaveLength(0); // eslint-disable-line no-console
      });
    });
  };

  responseErrors.forEach(({ statusCode, statusError }) => testResponseStatus(statusCode, statusError));
});
