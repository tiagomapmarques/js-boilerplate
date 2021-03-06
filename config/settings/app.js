import { PuppeteerRenderer as Renderer } from 'prerender-spa-plugin';

import { paths } from './paths';

export const app = {
  extensions: {
    logic: ['js', 'ts'],
    style: ['css', 'scss'],
  },
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
  port: 8000,
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
