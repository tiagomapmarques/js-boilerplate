import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', () => {
  const appInstance = { create: jest.fn(() => new Promise(resolve => resolve())) };
  return { HomeComponent: jest.fn(() => appInstance) };
});

describe('index', () => {
  const MockComponent = HomeComponent;
  const MockComponentCreate = MockComponent().create;

  afterEach(() => {
    MockComponent.mockClear();
    MockComponentCreate.mockClear();
  });

  it('registers a function to be run', () => {
    expect(loadEntry.mock.calls).toHaveLength(1);
    expect(loadEntry.mock.calls[0][0]).toEqual({ indexEntry });
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
      expect(MockComponent.mock.instances).toHaveLength(1);
      expect(MockComponent.mock.calls).toHaveLength(1);
      expect(MockComponent.mock.calls[0]).toEqual([VARIABLES.ROOTID]);
    });

    it('renders the correct component', () => {
      expect(MockComponentCreate.mock.calls).toHaveLength(1);
      expect(MockComponentCreate.mock.calls[0]).toEqual([]);
    });
  });
});
