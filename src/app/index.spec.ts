import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.MockInstance<typeof loadEntry>;

jest.mock('browser-polyfills', () => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');

interface MockHomeComponent extends jest.Mock<HomeComponent> {
  getCreateMethod: () => jest.Mock<Promise<{}>>;
}

jest.mock('components/home', () => {
  const component = { create: jest.fn(() => new Promise(resolve => resolve())) };
  const constructor = jest.fn(() => component) as jest.Mock<typeof component> & MockHomeComponent;
  constructor.getCreateMethod = () => component.create;
  return { HomeComponent: constructor };
});

describe('index', () => {
  afterEach(() => {
    (HomeComponent as MockHomeComponent).mockClear();
    (HomeComponent as MockHomeComponent).getCreateMethod().mockClear();
  });

  it('registers a function to be run', () => {
    expect((loadEntry as MockLoadEntry).mock.calls).toHaveLength(1);
    expect((loadEntry as MockLoadEntry).mock.calls[0][0]).toEqual(indexEntry);
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
      expect((HomeComponent as MockHomeComponent).mock.instances).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).mock.calls).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).mock.calls[0]).toHaveLength(0);
    });

    it('renders the correct component', () => {
      expect((HomeComponent as MockHomeComponent).getCreateMethod().mock.calls).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).getCreateMethod().mock.calls[0]).toEqual([]);
    });
  });
});
