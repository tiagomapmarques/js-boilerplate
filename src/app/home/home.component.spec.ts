import { HomeComponent, SampleData } from './';

describe('HomeComponent', () => {
  const mockAppId = 'mock-app-id';
  const sampleDataUrl = '/assets/sample.json';
  const sampleData: SampleData = {
    console: 'mock console data',
    page: 'mock page data',
  };
  let component: HomeComponent;

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
      _fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done).catch();
    });

    afterEach(() => {
      _fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(_fetch.mock.calls).toHaveLength(1);
      expect(_fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('does not set anything on the page', () => {
      expect(getElementHTML()).toBe('');
    });

    it('logs the console data', () => {
      expect(_console.log.mock.calls).toHaveLength(1);
      expect(_console.log.mock.calls[0]).toEqual([sampleData.console]);
    });
  });

  describe('when no errors occur', () => {
    createElement(document.body, 'div', { id: mockAppId });

    beforeEach((done) => {
      _fetch.mockResponse(JSON.stringify(sampleData));
      component.init().then(done).catch();
    });

    afterEach(() => {
      _fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(_fetch.mock.calls).toHaveLength(1);
      expect(_fetch.mock.calls[0]).toEqual([sampleDataUrl]);
    });

    it('sets the page data correctly', () => {
      expect(getElementHTML()).toBe(sampleData.page);
    });

    it('logs the console data', () => {
      expect(_console.log.mock.calls).toHaveLength(1);
      expect(_console.log.mock.calls[0]).toEqual([sampleData.console]);
    });
  });

  const testNothingHappens = () => {
    it('does not set anything on the page', () => {
      expect(getElementHTML()).toBe('');
    });

    it('does not log anything to the console', () => {
      expect(_console.log.mock.calls).toHaveLength(0);
    });
  };

  describe('when fetch throws an error', () => {
    createElement(document.body, 'div', { id: mockAppId });

    beforeEach((done) => {
      _fetch.mockImplementation(() => { throw new Error('fetch'); });
      component.init().then(done).catch();
    });

    afterEach(() => {
      _fetch.resetMocks();
    });

    testNothingHappens();
  });

  const responseErrors = [ 404, 500 ]; // tslint:disable-line:no-magic-numbers

  const testResponseStatus = (statusCode: number) => {
    describe(`when fetch returns a ${statusCode}`, () => {
      createElement(document.body, 'div', { id: mockAppId });

      beforeEach((done) => {
        _fetch.mockResponse(JSON.stringify(sampleData), { status: statusCode });
        component.init().then(done).catch();
      });

      afterEach(() => {
        _fetch.resetMocks();
      });

      testNothingHappens();
    });
  };

  responseErrors.forEach(testResponseStatus);
});
