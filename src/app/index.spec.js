import loadEntry from 'load-entry';

import { createElementTest } from 'testing';
import { HomeComponent } from 'components/home';

import { indexEntry } from '.';
import style from './index.style';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', () => {
  const appInstance = { register: jest.fn() };
  return { HomeComponent: appInstance };
});
jest.mock('services', () => ({
  HelperService: {
    createStyleElement: jest.fn(s => `<style>${JSON.stringify(s)}</style>`),
  },
}));

jest.mock('./index.style', () => global.mockStyle(require.requireActual('./index.style')));

describe('index', () => {
  afterEach(() => {
    HomeComponent.register.mockClear();
  });

  it('registers a function to be run', () => {
    expect(loadEntry.mock.calls).toHaveLength(1);
    expect(loadEntry.mock.calls[0][0]).toEqual({ indexEntry });
  });

  it('waits for WebComponentsReady', () => {
    expect(loadEntry.mock.calls[0][1].event).toEqual('WebComponentsReady');
  });

  describe('it is imported', () => {
    it('includes the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', () => {
    let originalAppend;

    createElementTest(document.body, 'div', { id: VARIABLES.ROOTID });

    beforeEach(() => {
      originalAppend = document.head.appendChild;
      document.head.appendChild = jest.fn();
      indexEntry();
    });

    afterEach(() => {
      document.head.appendChild = originalAppend;
    });

    it('appends the main style to the head tag', () => {
      expect(document.head.appendChild.mock.calls).toHaveLength(1);
      expect(document.head.appendChild.mock.calls[0])
        .toEqual([`<style>${JSON.stringify(style)}</style>`]);
    });

    it('registers the component', () => {
      expect(HomeComponent.register.mock.calls).toHaveLength(1);
      expect(HomeComponent.register.mock.calls[0]).toEqual([]);
    });

    it('creates the component on the root element', () => {
      const rootElement = document.getElementById(VARIABLES.ROOTID);
      expect(rootElement.childNodes.length).toBe(1);
      expect(rootElement.childNodes[0].tagName).toBe('HOME-COMPONENT');
      expect(rootElement.childNodes[0].childNodes.length).toBe(0);
    });
  });
});
