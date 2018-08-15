import loadEntry from 'load-entry';

import { HomeComponent } from 'app/home';

import { indexEntry } from '.';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('app/home', () => {
  const appInstance = { init: jest.fn(() => new Promise(resolve => resolve())) };
  return { HomeComponent: jest.fn(() => appInstance) };
});

describe('index', () => {
  const MockComponent = HomeComponent;
  const MockComponentInit = MockComponent().init;

  afterEach(() => {
    MockComponent.mockClear();
    MockComponentInit.mockClear();
  });

  it('registers a function to be run', () => {
    expect(loadEntry.mock.calls).toHaveLength(1);
    expect(loadEntry.mock.calls[0][0]).toEqual({ indexEntry });
  });

  describe('the imports', () => {
    it('include the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });
  });

  describe('when the application is executed', () => {
    beforeEach(() => {
      indexEntry();
    });

    it('creates the component on the root element', () => {
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toEqual([]);
    });

    it('renders the correct component', () => {
      expect(MockComponentInit.mock.calls).toHaveLength(1);
      expect(MockComponentInit.mock.calls[0]).toEqual([]);
    });
  });
});
