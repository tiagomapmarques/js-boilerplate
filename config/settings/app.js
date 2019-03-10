import { PuppeteerRenderer as Renderer } from 'prerender-spa-plugin';

import { paths } from './paths';

const webcomponentsPath = `${paths.baseAbsolute}/node_modules/@webcomponents/webcomponentsjs/`;

export const app = {
  entryPoints: [
    'index.js',
  ],
  style: {
    global: false,
    extract: false,
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
    ...['', 'bundles'].map(folder => ({
      from: `${webcomponentsPath}${folder}/*.js`,
      to: `polyfills/${folder}`,
      flatten: true,
    })),
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
