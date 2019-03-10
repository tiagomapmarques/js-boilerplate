import loadEntry from 'load-entry';
import * as ReactDOM from 'react-dom';

import { mockCreateElement } from 'testing';
import { HomeComponent } from 'components/home';

import { indexEntry } from '.';

type MockLoadEntry = typeof loadEntry & jest.Mock;

jest.mock('browser-polyfills', () => (global as MockGlobal).MockImports.add('polyfills'));
jest.mock('load-entry');
jest.mock('react-dom');

jest.mock('components/home', () => {
  const MockComponent = jest.fn();
  return { HomeComponent: MockComponent };
});

describe('index', () => {
  const mockLoadEntry = loadEntry as MockLoadEntry;

  afterEach(() => {
    mockLoadEntry.mockClear();
    (HomeComponent as jest.Mock<HomeComponent>).mockClear();
    (ReactDOM.render as jest.Mock<typeof ReactDOM>).mockClear();
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
    let mockRender: jest.Mock<typeof ReactDOM.render>;

    mockCreateElement(document.body, 'div', { id: PROJECT.ROOTID });

    beforeEach(() => {
      indexEntry();
      mockRender = (ReactDOM.render as jest.Mock<typeof ReactDOM.render>);
    });

    it('calls the renderer', () => {
      expect(mockRender.mock.calls).toHaveLength(1);
    });

    it('creates the component on the root element', () => {
      expect(mockRender.mock.calls[0][1].id).toEqual(PROJECT.ROOTID);
    });

    it('renders the correct component', () => {
      expect(mockRender.mock.calls[0][0].type).toEqual(HomeComponent);
    });
  });
});
