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
jest.mock('app/home');

const mockedHomeComponent = require('app/home').HomeComponent;

describe('index', () => {
  beforeEach(() => {
    require('./index');
  });

  afterEach(() => {
    mockedHomeComponent.mockReset();
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

    // builds the HomeComponent
    expect(mockedHomeComponent.mock.instances).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls[0]).toEqual(['app']);

    // runs the HomeComponent
    expect(mockedHomeComponent.mock.instances[0].run.mock.calls).toHaveLength(1);
    expect(mockedHomeComponent.mock.instances[0].run.mock.calls[0]).toEqual([]);
  });
});
