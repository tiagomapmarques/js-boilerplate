global.modulesImported = [];

jest.mock('babel-polyfill', () => {
  global.modulesImported.push('babel-polyfill');
});
jest.mock('whatwg-fetch', () => {
  global.modulesImported.push('whatwg-fetch');
});
jest.mock('./index.style', () => {
  global.modulesImported.push('./index.style');
});
jest.mock('./app.component');

const mockedAppComponent = require('./app.component').AppComponent;

describe('index', () => {
  beforeEach(() => {
    require('./index');
  });

  afterEach(() => {
    mockedAppComponent.mockReset();
    global.modulesImported = [];

    // FIXME - divide test in several tests and invalidate the require cache to import the file on every test
    // delete require.cache[require.resolve('./index')];
  });

  it('works', () => {
    // imports the two polyfills
    expect(global.modulesImported).toContain('babel-polyfill');
    expect(global.modulesImported).toContain('whatwg-fetch');

    // imports the index style
    expect(global.modulesImported).toContain('./index.style');

    // builds the AppComponent
    expect(mockedAppComponent.mock.instances).toHaveLength(1);
    expect(mockedAppComponent.mock.calls).toHaveLength(1);
    expect(mockedAppComponent.mock.calls[0]).toEqual(['app']);

    // runs the AppComponent
    expect(mockedAppComponent.mock.instances[0].run.mock.calls).toHaveLength(1);
    expect(mockedAppComponent.mock.instances[0].run.mock.calls[0]).toEqual([]);
  });
});
