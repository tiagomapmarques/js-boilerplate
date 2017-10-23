
jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('./index.style', () => global.TestImports.add('style'));
jest.mock('app/home');

describe('index', () => {
  let mockedHomeComponent;

  beforeEach(() => {
    document.addEventListener = jest.fn((_, callback) => callback());
    mockedHomeComponent = require('app/home').HomeComponent;
    require('./index');
  });

  afterEach(() => {
    mockedHomeComponent.mockReset();
    TestImports.reset();

    // FIXME - divide test in several tests and invalidate the require cache to import the file on every test
    // delete require.cache[require.resolve('./index')];
  });

  it('works', () => {
    // imports the browser-polyfills
    expect(TestImports.get()).toContain('polyfills');

    // imports the index style
    expect(TestImports.get()).toContain('style');

    // waits for the document to load
    // FIXME - when tests are divided, create a negative scenario to check the app does not run if addEventListener does not call the callback
    expect(document.addEventListener.mock.calls).toHaveLength(1);
    expect(document.addEventListener.mock.calls[0][0]).toEqual('DOMContentLoaded');

    // builds the HomeComponent
    expect(mockedHomeComponent.mock.instances).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls[0]).toEqual(['app']);

    // runs the HomeComponent
    expect(mockedHomeComponent.mock.instances[0].run.mock.calls).toHaveLength(1);
    expect(mockedHomeComponent.mock.instances[0].run.mock.calls[0]).toEqual([]);
  });
});
