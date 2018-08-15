import { resolve } from 'path';

const cleanPath = path => path.split('\\').filter(str => !!str).join('/');

const pathsBase = './';
const distBase = `${pathsBase}public/`;

export const paths = {
  base: pathsBase,
  app: `${pathsBase}src/app/`,
  static: `${pathsBase}src/static/`,
  dist: distBase,
  build: `${distBase}build/`,
  baseAbsolute: '',
  appAbsolute: '',
  staticAbsolute: '',
  distAbsolute: '',
  buildAbsolute: '',
  distRelative: '',
  buildRelative: '',
};

paths.baseAbsolute = resolve(paths.base);
paths.appAbsolute = resolve(paths.app);
paths.staticAbsolute = resolve(paths.static);
paths.distAbsolute = resolve(paths.dist);
paths.buildAbsolute = resolve(paths.build);

paths.distRelative = cleanPath(paths.distAbsolute.replace(paths.baseAbsolute, ''));
paths.buildRelative = cleanPath(paths.buildAbsolute.replace(paths.baseAbsolute, ''));
