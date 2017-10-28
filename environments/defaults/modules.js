
export default {
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
