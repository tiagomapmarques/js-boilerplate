
let testImports = [];

export const TestImports = {
  get: () => testImports,
  add: (moduleName) => {
    testImports.push(moduleName);
  },
  reset: () => {
    testImports = [];
  },
};
