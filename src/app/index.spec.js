import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', () => {
  const appInstance = { create: jest.fn(() => new Promise(resolve => resolve())) };
  const HomeComponent = jest.fn(() => appInstance);
  HomeComponent.create = appInstance.create;
  return { HomeComponent };
});

describe('index', () => {
  afterEach(() => {
    HomeComponent.mockClear();
    HomeComponent.create.mockClear();
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
      expect(HomeComponent.mock.instances).toHaveLength(1);
      expect(HomeComponent.mock.calls).toHaveLength(1);
      expect(HomeComponent.mock.calls[0]).toEqual([VARIABLES.ROOTID]);
    });

    it('renders the correct component', () => {
      expect(HomeComponent.create.mock.calls).toHaveLength(1);
      expect(HomeComponent.create.mock.calls[0]).toEqual([]);
    });
  });
});
