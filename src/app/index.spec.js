import { HomeComponent as MockComponent } from 'app/home';

import { App } from './';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));

jest.mock('app/home', () => {
  const appInstance = { init: jest.fn(() => new Promise(resolve => resolve())) };
  return { HomeComponent: jest.fn(() => appInstance) };
});

jest.mock('./index.style', () => global.TestImports.add('style'));

describe('index', () => {
  const rootId = 'app';
  const MockComponentInit = MockComponent().init;

  afterEach(() => {
    MockComponent.mockClear();
    MockComponentInit.mockClear();
  });

  describe('the imports', () => {
    it('include the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });

    it('include the global style', () => {
      expect(TestImports.get()).toContain('style');
    });
  });

  describe('when the application is executed', () => {
    beforeEach(() => {
      App();
    });

    it('creates the component on the root element', () => {
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toEqual([rootId]);
    });

    it('renders the correct component', () => {
      expect(MockComponentInit.mock.calls).toHaveLength(1);
      expect(MockComponentInit.mock.calls[0]).toEqual([]);
    });
  });
});
