import loadEntry from 'load-entry';
import Inferno from 'inferno';

import { HomeComponent } from 'app/home';

import { indexEntry } from './';

jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('load-entry');
jest.mock('inferno', () => {
  const realInferno = require.requireActual('inferno');
  return {
    ...realInferno,
    render: jest.fn(realInferno.render),
  };
});

jest.mock('app/home');

describe('index', () => {
  const rootId = 'app';
  const MockComponent = HomeComponent;

  createElement(document.body, 'div', { id: rootId });

  afterEach(() => {
    MockComponent.mockClear();
    Inferno.render.mockClear();
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
      expect(Inferno.render.mock.calls).toHaveLength(1);
    });

    it('creates the component on the root element', () => {
      expect(Inferno.render.mock.calls[0][1].id).toEqual(rootId);
    });

    it('renders the correct component', () => {
      expect(Inferno.render.mock.calls[0][0].type).toEqual(<MockComponent />.type);
    });
  });
});
