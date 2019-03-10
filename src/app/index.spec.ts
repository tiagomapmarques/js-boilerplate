import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.Mock;

jest.mock('browser-polyfills', () => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');

interface MockHomeComponent extends jest.Mock<HomeComponent> {
  getInstance: () => { create: jest.Mock<Promise<{}>>};
}

jest.mock('components/home', () => {
  const component = { create: jest.fn(() => new Promise(resolve => resolve())) };
  const constructor = jest.fn(() => component) as jest.Mock<typeof component> & MockHomeComponent;
  constructor.getInstance = () => component;
  return { HomeComponent: constructor };
});

describe('index', () => {
  const mockLoadEntry = loadEntry as MockLoadEntry;
  const MockComponent = HomeComponent as MockHomeComponent;

  afterEach(() => {
    mockLoadEntry.mockClear();
    MockComponent.mockClear();
    MockComponent.getInstance().create.mockClear();
  });

  it('registers a function to be run', () => {
    expect(mockLoadEntry.mock.calls).toHaveLength(1);
    expect(mockLoadEntry.mock.calls[0][0]).toEqual(indexEntry);
  });

  describe('it is imported', () => {
    it('includes the required libraries', () => {
      expect(MockImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', () => {
    beforeEach(() => {
      indexEntry();
    });

    it('creates the component on the root element', () => {
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toHaveLength(0);
    });

    it('renders the correct component', () => {
      expect(MockComponent.getInstance().create.mock.calls).toHaveLength(1);
      expect(MockComponent.getInstance().create.mock.calls[0]).toEqual([]);
    });
  });
});
