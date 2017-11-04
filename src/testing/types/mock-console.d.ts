
declare interface TestConsole {
  id: string;
  [key: string]: any;
}

declare interface MockConsole extends Console, jest.Mock {
  debug: jest.Mock;
  error: jest.Mock;
  info: jest.Mock;
  log: jest.Mock;
  warn: jest.Mock;
}

declare function mockConsole(functionsToMock?: string | string[]): void;

declare var _console: MockConsole;
