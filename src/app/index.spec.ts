import loadEntry from 'load-entry';

import { mockCreateElement } from 'testing';
import { HomeComponent } from 'components/home';

import { indexEntry } from '.';
import * as style from './index.style';

type MockLoadEntry = typeof loadEntry & jest.Mock;

interface LoadEntryConfiguration {
  event?: string;
  init?: string;
}

type AppendChildMock = typeof document.appendChild
  & jest.MockInstance<typeof document.appendChild, HTMLElement[]>;

jest.mock('browser-polyfills', () => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', () => {
  const constructor = { register: jest.fn() };
  return { HomeComponent: constructor };
});
jest.mock('services', () => ({
  HelperService: {
    createStyleElement: jest.fn((s: string) => `<style>${JSON.stringify(s)}</style>`),
  },
}));

jest.mock('./index.style', () => (global as MockGlobal).mockStyle(require.requireActual('./index.style')));

describe('index', () => {
  const mockLoadEntry = loadEntry as MockLoadEntry;

  afterEach(() => {
    (HomeComponent.register as jest.Mock).mockClear();
  });

  it('registers a function to be run', () => {
    expect(mockLoadEntry.mock.calls).toHaveLength(1);
    expect(mockLoadEntry.mock.calls[0][0]).toEqual(indexEntry);
  });

  it('waits for WebComponentsReady', () => {
    expect((mockLoadEntry.mock.calls[0][1] as LoadEntryConfiguration).event).toEqual('WebComponentsReady');
  });

  describe('it is imported', () => {
    it('includes the required libraries', () => {
      expect(MockImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', () => {
    let originalAppend: typeof document.appendChild;

    mockCreateElement(document.body, 'div', { id: PROJECT.ROOTID });

    beforeEach(() => {
      originalAppend = document.head.appendChild;
      document.head.appendChild = jest.fn();
      indexEntry();
    });

    afterEach(() => {
      document.head.appendChild = originalAppend;
    });

    it('appends the main style to the head tag', () => {
      expect((document.head.appendChild as AppendChildMock).mock.calls).toHaveLength(1);
      expect((document.head.appendChild as AppendChildMock).mock.calls[0])
        .toEqual([`<style>${JSON.stringify(style.default)}</style>`]);
    });

    it('registers the component', () => {
      expect((HomeComponent.register as jest.Mock).mock.calls).toHaveLength(1);
      expect((HomeComponent.register as jest.Mock).mock.calls[0]).toEqual([]);
    });

    it('creates the component on the root element', () => {
      const rootElement = document.getElementById(PROJECT.ROOTID) as HTMLElement;
      expect(rootElement.childNodes.length).toBe(1);
      expect((rootElement.childNodes[0] as HTMLElement).tagName).toBe('HOME-COMPONENT');
      expect(rootElement.childNodes[0].childNodes.length).toBe(0);
    });
  });
});
