import { HomeComponent } from './';
import { Logger } from './logger';

jest.mock('./logger');

describe('HomeComponent', () => {
  const mockAppId = 'mock-app-id';
  const sampleData = {
    page: 'mock page data',
    console: 'mock console data',
  };
  let component;

  beforeEach(() => {
    component = new HomeComponent(mockAppId);
  });

  afterEach(() => {
    Logger.catch.mockReset();
  });

  describe('#constructor', () => {
    it('sets the app id', () => {
      expect(component.appId).toEqual(mockAppId);
    });
  });

  describe('#run', () => {
    describe('when no error occurs', () => {
      beforeEach(() => {
        component.getSampleData = jest.fn(() => new Promise((resolve) => resolve(sampleData)));
        component.buildPage = jest.fn();
        component.run();
      });

      it('calls #getSampleData once', () => {
        expect(component.getSampleData.mock.calls).toHaveLength(1);
        expect(component.getSampleData.mock.calls[0]).toEqual([]);
      });

      it('calls #buildPage once', () => {
        expect(component.buildPage.mock.calls).toHaveLength(1);
      });

      it('sends #buildPage the sample data', () => {
        expect(component.buildPage.mock.calls[0]).toEqual([sampleData]);
      });
    });

    describe('when #getSampleData throws an error', () => {
      beforeEach(() => {
        component.getSampleData = jest.fn(() => new Promise(() => { throw new Error('getSampleData'); }));
        component.buildPage = jest.fn();
        component.run();
      });

      it('logs the error given by #getSampleData', () => {
        expect(Logger.catch.mock.calls).toHaveLength(1);
        expect(Logger.catch.mock.calls[0]).toEqual([new Error('getSampleData')]);
      });

      it('never calls #buildPage', () => {
        expect(component.buildPage.mock.calls).toHaveLength(0);
      });
    });

    describe('when #buildPage throws an error', () => {
      beforeEach(() => {
        component.getSampleData = jest.fn(() => new Promise((resolve) => resolve(sampleData)));
        component.buildPage = jest.fn(() => { throw new Error('buildPage'); });
        component.run();
      });

      it('calls #buildPage once', () => {
        expect(component.buildPage.mock.calls).toHaveLength(1);
      });

      it('sends #buildPage the sample data', () => {
        expect(component.buildPage.mock.calls[0]).toEqual([sampleData]);
      });

      it('logs the error given by #buildPage', () => {
        expect(Logger.catch.mock.calls).toHaveLength(1);
        expect(Logger.catch.mock.calls[0]).toEqual([new Error('buildPage')]);
      });
    });
  });

  describe('#getSampleData', () => {
    const fetchResponseError = 'Fetch response not ok';
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
    let callback;

    describe('when no error occurs', () => {
      beforeEach((done) => {
        callback = jest.fn();
        fetch.mockResponse(JSON.stringify(sampleData), { status: 200 });
        component.getSampleData().then(callback).then(done);
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('calls fetch with the correct path', () => {
        expect(fetch.mock.calls).toHaveLength(1);
        expect(fetch.mock.calls[0]).toEqual(['/assets/sample.json']);
      });

      it('returns a promise with the fetched data', () => {
        expect(callback.mock.calls).toHaveLength(1);
        expect(callback.mock.calls[0]).toEqual([sampleData]);
      });
    });

    describe('when fetch returns an error', () => {
      let thrownError;

      beforeEach(() => {
        callback = jest.fn();
        thrownError = new Error('no error thrown');
        fetch.mockImplementation(() => { throw new Error('fetch'); });
        try {
          component.getSampleData().then(callback);
        } catch (error) {
          thrownError = error;
        }
      });

      afterEach(() => {
        fetch.resetMocks();
      });

      it('thows the fetch error', () => {
        expect(thrownError.message).toBe('fetch');
      });

      it('never calls the callback', () => {
        expect(callback.mock.calls).toHaveLength(0);
      });
    });

    const testResponseStatus = (statusCode, statusError) => {
      describe(`when the response is ${statusCode}`, () => {
        beforeEach(() => {
          callback = jest.fn();
          fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
          component.getSampleData().then(callback);
        });

        afterEach(() => {
          fetch.resetMocks();
        });

        it('logs the custom error', () => {
          expect(Logger.catch.mock.calls).toHaveLength(1);
          expect(Logger.catch.mock.calls[0]).toEqual([statusError]);
        });
      });
    };

    responseErrors.forEach(({ statusCode, statusError }) => testResponseStatus(statusCode, statusError));
  });

  describe('#buildPage', () => {
    mockConsole();

    const testBuildPage = (addElement) => {
      if (addElement) {
        createElement(document.body, 'div', { id: mockAppId });
      }

      beforeEach(() => {
        component.buildPage(sampleData);
      });

      it('sets the page data correctly', () => {
        const element = document.getElementById(mockAppId);
        if (addElement) {
          expect(element.innerHTML).toEqual(sampleData.page);
        } else {
          expect(document.body.innerHTML).toEqual('');
        }
      });

      it('logs the console data', () => {
        expect(console.log.mock.calls).toHaveLength(1); // eslint-disable-line no-console
        expect(console.log.mock.calls[0]).toEqual([sampleData.console]); // eslint-disable-line no-console
      });
    };

    describe('when there is an element on the page', () => {
      testBuildPage(true);
    });

    describe('when there is no element on the page', () => {
      testBuildPage(false);
    });
  });
});
