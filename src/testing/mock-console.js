
export const mockConsole = (functionsToMock = 'log') => {
  /* eslint-disable no-console */
  const originalConsoleFunctions = {};

  beforeEach(() => {
    let functionsToMockList = functionsToMock;
    if (typeof functionsToMock === 'string') {
      functionsToMockList = [functionsToMock];
    }
    functionsToMockList.forEach((func) => {
      originalConsoleFunctions[func] = console[func];
      console[func] = jest.fn();
    });
  });

  afterEach(() => {
    Object.keys(originalConsoleFunctions).forEach((func) => {
      console[func] = originalConsoleFunctions[func];
    });
  });
  /* eslint-enable no-console */
};
