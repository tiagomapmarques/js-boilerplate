import { PuppeteerRenderer as Renderer } from 'prerender-spa-plugin';

import { paths } from './paths';

export const app = {
  entryPoints: [
    'index.js',
  ],
  style: {
    global: false,
    extract: true,
  },
  commonChunk: {
    test: /node_modules/,
    name: 'vendor',
    chunks: 'initial',
  },
  compileExclusions: [],
  cleanExclusions: [],
  externalFiles: [
    paths.staticAbsolute,
  ],
  output: {
    script: '[name].js',
    style: '[name].css',
  },
  rendering: {
    staticDir: paths.distAbsolute,
    routes: ['/'],
    server: {
      port: 8001,
    },
    renderer: new Renderer({
      args: ['–no-sandbox', '–disable-setuid-sandbox'],
    }),
  },
};
