import * as webpack from 'webpack';

export interface ProjectModules {
  entries: webpack.Entry;
  chunkOverrides: webpack.optimize.CommonsChunkPlugin.Options;
  output: string;
}

export const modules: ProjectModules = {
  entries: {
    app: './index.ts',
    vendor: [
      // Support libraries
      'browser-polyfills',
    ],
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
