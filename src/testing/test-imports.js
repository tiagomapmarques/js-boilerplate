
export class TestImports {
  static imports = [];

  static get() {
    return TestImports.imports;
  }

  static add(moduleName) {
    TestImports.imports.push(moduleName);
  }

  static reset() {
    TestImports.imports = [];
  }
}
