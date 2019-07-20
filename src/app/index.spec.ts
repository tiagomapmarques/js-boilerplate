import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.Mock;

jest.mock('browser-polyfills', (): void => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');

interface MockHomeComponent extends jest.Mock<HomeComponent> {
  getInstance: () => { create: jest.Mock<Promise<{}>>};
}

jest.mock('components/home', (): { HomeComponent: MockHomeComponent } => {
  const component = {
    create: jest.fn((): Promise<void> => new Promise((resolve): void => resolve())),
  };
  const constructor = jest.fn((): MockHomeComponent => component);
  constructor.getInstance = (): MockHomeComponent => component;
  return { HomeComponent: constructor };
});

describe('index', (): void => {
  const mockLoadEntry = loadEntry as MockLoadEntry;
  const MockComponent = HomeComponent as MockHomeComponent;

  afterEach((): void => {
    mockLoadEntry.mockClear();
    MockComponent.mockClear();
    MockComponent.getInstance().create.mockClear();
  });

  it('registers a function to be run', (): void => {
    expect(mockLoadEntry.mock.calls).toHaveLength(1);
    expect(mockLoadEntry.mock.calls[0][0]).toEqual(indexEntry);
  });

  describe('it is imported', (): void => {
    it('includes the required libraries', (): void => {
      expect(MockImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', (): void => {
    beforeEach((): void => {
      indexEntry();
    });

    it('creates the component on the root element', (): void => {
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toHaveLength(0);
    });

    it('renders the correct component', (): void => {
      expect(MockComponent.getInstance().create.mock.calls).toHaveLength(1);
      expect(MockComponent.getInstance().create.mock.calls[0]).toEqual([]);
    });
  });
});
