import loadEntry from 'load-entry';

import { mockCreateElement } from 'testing';
import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.Mock;

interface LoadEntryConfiguration {
  event?: string;
  init?: string;
}

jest.mock('browser-polyfills', (): void => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');

jest.mock('components/home', (): { HomeComponent: { register: jest.Mock } } => {
  const constructor = {
    register: jest.fn(),
    componentName: 'home-component',
  };
  return { HomeComponent: constructor };
});

jest.mock('./index.style', (): IndexObject<string> => (global as MockGlobal).mockStyle(require.requireActual('./index.style')));

describe('index', (): void => {
  const mockLoadEntry = loadEntry as MockLoadEntry;

  afterEach((): void => {
    (HomeComponent.register as jest.Mock).mockClear();
  });

  it('registers a function to be run', (): void => {
    expect(mockLoadEntry.mock.calls).toHaveLength(1);
    expect(mockLoadEntry.mock.calls[0][0]).toEqual(indexEntry);
  });

  it('waits for WebComponentsReady', (): void => {
    expect((mockLoadEntry.mock.calls[0][1] as LoadEntryConfiguration).event).toEqual('WebComponentsReady');
  });

  describe('it is imported', (): void => {
    it('includes the required libraries', (): void => {
      expect(MockImports.get()).toContain('polyfills');
    });
  });

  describe('the application is executed', (): void => {
    let originalAppend: typeof document.appendChild;

    mockCreateElement(document.body, 'div', { id: PROJECT.ROOTID });

    beforeEach((): void => {
      originalAppend = document.head.appendChild;
      document.head.appendChild = jest.fn();
      indexEntry();
    });

    afterEach((): void => {
      document.head.appendChild = originalAppend;
    });

    it('creates the component on the root element', (): void => {
      const rootElement = document.getElementById(PROJECT.ROOTID) as HTMLElement;
      expect(rootElement.childNodes.length).toBe(1);
      expect((rootElement.childNodes[0] as HTMLElement).tagName).toBe('HOME-COMPONENT');
      expect(rootElement.childNodes[0].childNodes.length).toBe(0);
    });
  });
});
