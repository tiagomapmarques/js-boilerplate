import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

jest.mock('browser-polyfills', () => (global as TestGlobal).TestImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', () => {
  const appInstance = { create: jest.fn(() => new Promise(resolve => resolve())) };
  const MockComponent = jest.fn(() => appInstance);
  (MockComponent as any).create = appInstance.create;
  return { HomeComponent: MockComponent };
});

type MockLoadEntry = typeof loadEntry & jest.MockInstance<typeof loadEntry>;

type HomeComponentConstructor = () => HomeComponent;
interface MockHomeComponent extends HomeComponentConstructor, jest.Mock<HomeComponent> {
  create: jest.Mock;
}

describe('index', () => {
  afterEach(() => {
    (HomeComponent as MockHomeComponent).mockClear();
    (HomeComponent as MockHomeComponent).create.mockClear();
  });

  it('registers a function to be run', () => {
    expect((loadEntry as MockLoadEntry).mock.calls).toHaveLength(1);
    expect((loadEntry as MockLoadEntry).mock.calls[0][0]).toEqual(indexEntry);
  });

  describe('it is imported', () => {
    it('includes the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', () => {
    beforeEach(() => {
      indexEntry();
    });

    it('creates the component on the root element', () => {
      expect((HomeComponent as MockHomeComponent).mock.instances).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).mock.calls).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).mock.calls[0]).toEqual([VARIABLES.ROOTID]);
    });

    it('renders the correct component', () => {
      expect((HomeComponent as MockHomeComponent).create.mock.calls).toHaveLength(1);
      expect((HomeComponent as MockHomeComponent).create.mock.calls[0]).toEqual([]);
    });
  });
});
