
export default {
  entries: {
    app: './index.js',
    vendor: [
      // App libraries
      'vue', 'vue-router', 'vuex', 'vuex-automap',
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
