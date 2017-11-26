jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));

jest.mock('app/home', () => {
  const appInstance = { init: jest.fn(() => new Promise(resolve => resolve())) };
  return { HomeComponent: jest.fn(() => appInstance) };
});

jest.mock('./index.style', () => global.TestImports.add('style'));

describe('index', () => {
  const rootId = 'app';
  const mockListener = jest.fn((_, callback) => callback());
  let MockComponent;

  beforeEach(() => {
    document.addEventListener = mockListener;
    // eslint-disable-next-line global-require
    MockComponent = require('app/home').HomeComponent;
    // eslint-disable-next-line global-require
    require('app');
  });

  afterEach(() => {
    // FIXME delete cache from "require('app');" so resets can be done
    // TestImports.reset();
    // mockListener.mockReset();
  });

  describe('the imports', () => {
    it('include the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });

    it('include the global style', () => {
      expect(TestImports.get()).toContain('style');
    });
  });

  describe('the application', () => {
    it('calls the renderer', () => {
      expect(document.addEventListener.mock.calls).toHaveLength(1);
      expect(document.addEventListener.mock.calls[0][0]).toEqual('DOMContentLoaded');
    });

    it('renders the correct component', () => {
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toEqual([rootId]);
    });

    it('renders inside the root element', () => {
      expect(MockComponent().init.mock.calls).toHaveLength(1);
      expect(MockComponent().init.mock.calls[0]).toEqual([]);
    });
  });
});
