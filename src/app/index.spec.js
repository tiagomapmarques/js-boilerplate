global.modulesImported = [];

jest.mock('browser-polyfills', () => {
  global.modulesImported.push('browser-polyfills');
});
jest.mock('./index.style', () => {
  global.modulesImported.push('./index.style');
});
// FIXME dont mock vue - just test that vue does what it's supposed to (in the DOM).
jest.mock('vue');
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
    // mockedHomeComponent.mockReset();
    global.modulesImported = [];

    // FIXME - divide test in several tests and invalidate the require cache to import the file on every test
    // delete require.cache[require.resolve('./index')];
  });

  it('works', () => {
    // imports the browser-polyfills
    expect(global.modulesImported).toContain('browser-polyfills');

    // imports the index style
    expect(global.modulesImported).toContain('./index.style');

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
