
export class TestImports {
  imports;

  constructor() {
    this.imports = [];
  }

  get() {
    return this.imports;
  }

  add(moduleName) {
    this.imports.push(moduleName);
  }

  reset() {
    this.imports = [];
  }
}
