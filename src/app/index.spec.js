import loadEntry from 'load-entry';
import React from 'react';
import mockReactDOM from 'react-dom';

import { HomeComponent } from 'app/home';

import { indexEntry } from './';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');
jest.mock('react-dom');

jest.mock('app/home');

describe('index', () => {
  const rootId = 'app';
  const MockComponent = HomeComponent;

  createElement(document.body, 'div', { id: rootId });

  afterEach(() => {
    MockComponent.mockClear();
    mockReactDOM.render.mockClear();
  });

  it('registers a function to be run', () => {
    expect(loadEntry.mock.calls).toHaveLength(1);
    expect(loadEntry.mock.calls[0][0]).toEqual({ indexEntry });
  });

  describe('the imports', () => {
    it('include the required libraries', () => {
      expect(TestImports.get()).toContain('polyfills');
    });
  });

  describe('when the application is executed', () => {
    beforeEach(() => {
      indexEntry();
    });

    it('calls the renderer', () => {
      expect(mockReactDOM.render.mock.calls).toHaveLength(1);
    });

    it('creates the component on the root element', () => {
      expect(mockReactDOM.render.mock.calls[0][1].id).toEqual(rootId);
    });

    it('renders the correct component', () => {
      expect(mockReactDOM.render.mock.calls[0][0].type).toEqual(<MockComponent />.type);
    });
  });
});
