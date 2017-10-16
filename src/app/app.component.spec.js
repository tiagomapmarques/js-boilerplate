import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const mockAppId = 'mock-app-id';
  const sampleData = {
    page: 'mock page data',
    console: 'mock console data',
  };
  let component;

  beforeEach(() => {
    component = new AppComponent(mockAppId);
  });

  describe('#constructor', () => {
    it('sets the app id', () => {
      expect(component.appId).toEqual(mockAppId);
    });
  });

  describe('#run', () => {
    beforeEach(() => {
      component.getSampleData = jest.fn(() => new Promise((resolve) => resolve(sampleData)));
      component.build = jest.fn();
      component.run();
    });

    it('calls getSampleData', () => {
      expect(component.getSampleData.mock.calls).toHaveLength(1);
    });

    it('calls build with the data from getSampleData', () => {
      expect(component.build.mock.calls).toHaveLength(1);
      expect(component.build.mock.calls[0]).toEqual([sampleData]);
    });
  });

  describe('#getSampleData', () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn();
      fetch.mockResponse(JSON.stringify(sampleData));
      component.getSampleData().then(callback);
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('calls fetch with the correct path', () => {
      expect(fetch.mock.calls).toHaveLength(1);
      expect(fetch.mock.calls[0]).toEqual(['/assets/sample.json']);
    });

    it('returns a promise for the fetched data in json format', () => {
      expect(callback.mock.calls).toHaveLength(1);
      expect(callback.mock.calls[0]).toEqual([sampleData]);
    });
  });

  describe('#build', () => {
    mockConsole();
    mockElement('div', mockAppId);

    beforeEach(() => {
      component.build(sampleData);
    });

    it('sets the page data', () => {
      expect(document.getElementById(mockAppId).innerHTML).toEqual(sampleData.page);
    });

    it('logs the console data', () => {
      expect(console.log.mock.calls).toHaveLength(1); // eslint-disable-line no-console
      expect(console.log.mock.calls[0]).toEqual([sampleData.console]); // eslint-disable-line no-console
    });
  });
});
