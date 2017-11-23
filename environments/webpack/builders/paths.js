import { resolve } from 'path';

const pathsBase = './';

export const paths = {
  base: pathsBase,
  app: `${pathsBase}src/app/`,
  static: `${pathsBase}src/static/`,
  dist: `${pathsBase}public/`,
  build: '',
  baseAbsolute: '',
  appAbsolute: '',
  staticAbsolute: '',
  distAbsolute: '',
  buildAbsolute: '',
};

paths.build = `${paths.dist}build/`;
paths.baseAbsolute = resolve(paths.base);
paths.appAbsolute = resolve(paths.app);
paths.staticAbsolute = resolve(paths.static);
paths.distAbsolute = resolve(paths.dist);
paths.buildAbsolute = resolve(paths.build);
