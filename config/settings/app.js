import { paths } from './paths';

export const app = {
  entryPoints: {
    app: 'index.js',
  },
  commonChunk: {
    test: /node_modules/,
    name: 'vendor',
    chunks: 'initial',
  },
  output: '[name].js',
  rendering: {
    staticDir: paths.distAbsolute,
    routes: ['/'],
    server: {
      port: 8001,
    },
  },
};
