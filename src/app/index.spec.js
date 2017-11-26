import React from 'react';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('react-dom');

jest.mock('app/home');

jest.mock('./index.style', () => global.TestImports.add('style'));

describe('index', () => {
  const rootId = 'app';
  let mockRender;
  let MockComponent;

  createElement(document.body, 'div', { id: rootId });

  beforeEach(() => {
    /* eslint-disable global-require */
    mockRender = require('react-dom').render;
    MockComponent = require('app/home').HomeComponent;
    require('./');
    /* eslint-enable global-require */
  });

  afterEach(() => {
    // FIXME delete cache from "require('app');" so resets can be done
    // mockRender.mockReset();
    // MockComponent.mockReset();
    // TestImports.reset();
  });

  describe('the imports', () => {
    it('include the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });

    it('include the global style', () => {
      expect(TestImports.get()).toContain('style');
    });
  });

  describe('the application', () => {
    it('calls the renderer', () => {
      expect(mockRender.mock.calls).toHaveLength(1);
    });

    it('creates the component on the root element', () => {
      expect(mockRender.mock.calls[0][1].id).toEqual(rootId);
    });

    it('renders the correct component', () => {
      expect(mockRender.mock.calls[0][0]).toEqual(<MockComponent />);
    });
  });
});
