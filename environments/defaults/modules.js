
export default {
  entries: {
    app: './index.js',
    vendor: [
      // App libraries
      'vue',
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
