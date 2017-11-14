
export const modules = {
  entries: {
    app: './index.js',
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
