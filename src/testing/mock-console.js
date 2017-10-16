/* eslint-disable no-console */
const mockConsole = (functionsToMock = 'log') => {
  let originalConsoleFunctions = {};

  beforeEach(() => {
    if (typeof functionsToMock === 'string') {
      functionsToMock = [functionsToMock];
    }
    functionsToMock.forEach((func) => {
      originalConsoleFunctions[func] = console[func];
      console[func] = jest.fn();
    });
  });

  afterEach(() => {
    Object.keys(originalConsoleFunctions).forEach((func) => {
      console[func] = originalConsoleFunctions[func];
    });
  });
};
/* eslint-enable no-console */

export default mockConsole;
