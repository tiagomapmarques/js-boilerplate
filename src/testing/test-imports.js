
let testImports = [];

const TestImports = {
  get: () => testImports,
  add: (moduleName) => {
    testImports.push(moduleName);
  },
  reset: () => {
    testImports = [];
  },
};

export default TestImports;
