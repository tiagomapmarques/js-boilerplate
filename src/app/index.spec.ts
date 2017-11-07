import { HomeComponent } from 'app/home';

jest.mock('browser-polyfills', () => (global as TestGlobal).TestImports.add('polyfills'));
jest.mock('./index.style', () => (global as TestGlobal).TestImports.add('style'));
jest.mock('app/home', () => {
  const appInstance = { init: jest.fn(() => new Promise((resolve) => resolve())) };
  return { HomeComponent: jest.fn(() => appInstance) };
});

type HomeComponentConstructor = () => HomeComponent;
interface MockHomeComponent extends HomeComponentConstructor, jest.Mock<HomeComponent> {}

describe('index', () => {
  let mockedHomeComponent: MockHomeComponent;

  beforeEach(() => {
    document.addEventListener = jest.fn((_, callback) => callback());
    mockedHomeComponent = require('app/home').HomeComponent; // tslint:disable-line:no-require-imports
    require('./index'); // tslint:disable-line:no-require-imports
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
    expect((document.addEventListener as jest.Mock).mock.calls).toHaveLength(1);
    expect((document.addEventListener as jest.Mock).mock.calls[0][0]).toEqual('DOMContentLoaded');

    // builds the HomeComponent
    expect(mockedHomeComponent.mock.instances).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls).toHaveLength(1);
    expect(mockedHomeComponent.mock.calls[0]).toEqual(['app']);

    // runs the HomeComponent
    expect((mockedHomeComponent().init as jest.Mock).mock.calls).toHaveLength(1);
    expect((mockedHomeComponent().init as jest.Mock).mock.calls[0]).toEqual([]);
  });
});
