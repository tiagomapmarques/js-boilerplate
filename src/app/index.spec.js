
jest.mock('browser-polyfills', () => global.TestImports.add('polyfills'));
jest.mock('./index.style', () => global.TestImports.add('style'));
// FIXME dont mock vue - just test that vue does what it's supposed to (in the DOM).
jest.mock('vue', () => jest.fn());
jest.mock('app/home');

describe('index', () => {
  let mockedVue;
  let mockedHomeComponent;

  beforeEach(() => {
    mockedVue = require('vue');
    mockedHomeComponent = require('app/home');
    require('./index');
  });

  afterEach(() => {
    TestImports.reset();

    // FIXME - divide test in several tests and invalidate the require cache to import the file on every test
    // delete require.cache[require.resolve('./index')];
  });

  it('works', () => {
    // imports the browser-polyfills
    expect(TestImports.get()).toContain('polyfills');

    // imports the index style
    expect(TestImports.get()).toContain('style');

    const vueArguments = mockedVue.mock.calls[0];
    // Vue is initialized correctly
    expect(mockedVue.mock.instances).toHaveLength(1);
    expect(vueArguments).toHaveLength(1);
    expect(Object.keys(vueArguments[0])).toEqual([ 'el', 'render' ]);

    // Vue is initialized with the correct element id
    expect(vueArguments[0].el).toEqual('#app');

    // Vue is initialized with the correct component
    const component = vueArguments[0].render((c) => c);
    expect(component).toBe(mockedHomeComponent);
  });
});
