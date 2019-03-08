import { resolve } from 'path';
import { loader as ExtractLoader } from 'mini-css-extract-plugin';

import { javascriptToSass } from './javascript-to-sass';

const projectPath = resolve(process.cwd());

// eslint-disable-next-line import/no-dynamic-require
const babelOptions = require(`${projectPath}/.babelrc.js`);

const postCssPath = `${projectPath}/postcss.config.js`;

const getStyleNaming = (minify, globalStyles) => {
  if (globalStyles) {
    return '[name]';
  }
  return minify ? '[hash:base64:24]' : '[path][name]-[local]';
};

const buildRules = minify => (global, extract, compileExclusions, runtimeVariables) => ([
  {
    test: /\.(j|t)s$/,
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
          modules: true,
          localIdentName: getStyleNaming(minify, global),
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: { path: postCssPath },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          data: javascriptToSass(runtimeVariables),
        },
      },
    ],
  },
]);

export const rules = {
  getPretty: buildRules(false),
  getMinified: buildRules(true),
};
