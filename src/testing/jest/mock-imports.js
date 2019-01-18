
const imports = [];

export const MockImports = {
  get() {
    return imports;
  },

  add(moduleName) {
    imports.push(moduleName);
  },
};
