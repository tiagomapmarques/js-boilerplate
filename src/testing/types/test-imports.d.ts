
declare interface TestImportsInterface {
  get: () => string[];
  add: (moduleName: string) => void;
  reset: () => void;
}

declare const TestImports: TestImportsInterface;
