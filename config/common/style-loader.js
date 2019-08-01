import { readFileSync } from 'fs';
import { resolve } from 'path';
import { stringifyRequest } from 'loader-utils';

const LOADER_CONTENT_FILE = resolve(`${__dirname}/style-loader-content.js`);

// eslint-disable-next-line func-names
const styleLoader = function () {};

// eslint-disable-next-line func-names
styleLoader.pitch = function (request) {
  const context = this;
  const content = readFileSync(LOADER_CONTENT_FILE, 'utf8');

  return content.replace('__STYLE__', stringifyRequest(context, `!!${request}`));
};

module.exports = styleLoader;
