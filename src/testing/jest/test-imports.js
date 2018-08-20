
const imports = [];

export const TestImports = {
  get() {
    return imports;
  },

  add(moduleName) {
    imports.push(moduleName);
  },
};
