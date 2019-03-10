import loadEntry from 'load-entry';
import Vue, { ComponentOptions } from 'vue';

import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.Mock;
type MockVue = typeof Vue & jest.Mock;

jest.mock('browser-polyfills', () => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');
jest.mock('vue');

jest.mock('components/home', () => ({
  // FIXME: jest is not able to auto-mock the "@Component" decorator
  HomeComponent: jest.fn(),
}));

describe('index', () => {
  const mockLoadEntry = loadEntry as MockLoadEntry;

  afterEach(() => {
    mockLoadEntry.mockClear();
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
    let vueCalls: ComponentOptions<Vue>[];

    beforeEach(() => {
      indexEntry();
      [vueCalls] = (Vue as MockVue).mock.calls;
    });

    it('calls the renderer', () => {
      expect((Vue as MockVue).mock.instances).toHaveLength(1);
      expect(vueCalls).toHaveLength(1);
    });

    it('creates the component on the root element', () => {
      expect(vueCalls[0].el).toEqual(`#${PROJECT.ROOTID}`);
    });

    it('renders the correct component', () => {
      const { render } = vueCalls[0];
      const vueRenderer = jest.fn((html: JSX.Element) => html);
      expect((render as typeof Vue.prototype.$createElement)(vueRenderer)).toBe(HomeComponent);
    });
  });
});
