
export const mockConsole = (functionsToMock: string | string[] = 'log') => {
  const originalConsoleFunctions: { [key: string]: string } = {};

  beforeEach(() => {
    if (typeof functionsToMock === 'string') {
      functionsToMock = [functionsToMock];
    }
    functionsToMock.forEach((func) => {
      originalConsoleFunctions[func] = (console as any)[func]; // tslint:disable-line:no-any
      (console as any)[func] = jest.fn(); // tslint:disable-line:no-any
    });
  });

  afterEach(() => {
    Object.keys(originalConsoleFunctions).forEach((func) => {
      (console as any)[func] = originalConsoleFunctions[func]; // tslint:disable-line:no-any
    });
  });
};
