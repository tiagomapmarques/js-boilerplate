import { existsSync } from 'fs';
import { resolve } from 'path';
import { loader as ExtractLoader } from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

import { javascriptToSass } from './javascript-to-sass';

const projectPath = resolve(process.cwd());

// eslint-disable-next-line import/no-dynamic-require
const babelOptions = require(`${projectPath}/.babelrc.js`);

const removeLast = (path) => path.split('/').slice(0, -1).join('/');

const getStyleNaming = (minify, globalStyles) => {
  if (globalStyles) {
    return '[name]';
  }
  return minify ? '[hash:base64:24]' : '[path]__[name]__[local]--[hash:base64:5]';
};

const buildRules = (minify) => (global, extract, compileExclusions, runtimeVariables) => ([
  {
    test: /\.(j|t)sx?$/,
    use: {
      loader: 'babel-loader',
      options: babelOptions,
    },
    ...(compileExclusions.length
      ? { exclude: new RegExp(`node_modules/(${compileExclusions.join('|')})`) }
      : {}),
  },
  {
    test: /\.s?css$/,
    use: [
      {
        loader: resolve(`${__dirname}/style-loader`),
      },
      ...(extract ? [ExtractLoader] : []),
      {
        loader: 'css-loader',
        options: {
          localsConvention: 'camelCase',
          modules: {
            mode: 'local',
            localIdentName: getStyleNaming(minify, global),
          },
          url: (url, resource) => url.indexOf('http') !== 0
            && url.indexOf('/') !== 0
            && (existsSync(resolve(url)) || existsSync(resolve(`${removeLast(resource)}/${url}`))),
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer(),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: javascriptToSass(runtimeVariables),
        },
      },
    ],
  },
  {
    test: /\.(svg|txt)$/,
    use: 'raw-loader',
  },
  {
    test: /\.(png|jpe?g|gif)$/,
    use: 'url-loader',
  },
]);

export const rules = {
  getPretty: buildRules(false),
  getMinified: buildRules(true),
};
