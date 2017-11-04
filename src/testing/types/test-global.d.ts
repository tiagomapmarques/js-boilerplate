
declare interface TestGlobal extends NodeJS.Global {
  fetch: MockFetch;
  _fetch: MockFetch;
  mockConsole: (functionsToMock: string|string[]) => void;
  _console: MockConsole;
  createElement: (parentNode: TestNode, tagName: string, attributes: TestNodeAttributes) => void;
  TestImports: TestImportsInterface;
}

declare const _global: TestGlobal;
