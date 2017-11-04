
let testImports: string[] = [];

export const TestImports: TestImportsInterface = {
  get: () => testImports,
  add: (moduleName: string) => {
    testImports.push(moduleName);
  },
  reset: () => {
    testImports = [];
  },
};
