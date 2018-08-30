import { paths } from './paths';

const webcomponentsPath = `${paths.baseAbsolute}/node_modules/@webcomponents/webcomponentsjs/`;

export const app = {
  entryPoints: {
    app: 'index.js',
  },
  commonChunk: {
    test: /node_modules/,
    name: 'vendor',
    chunks: 'initial',
  },
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
  },
};
