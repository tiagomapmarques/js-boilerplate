import { vendorPackages } from 'project-packages-filters';

const vendorExclusions = {
  literals: [],
  regex: [],
};

const vendor = vendorPackages(vendorExclusions);

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.log('vendor packages:', vendor);
}

export const app = {
  chunks: {
    app: 'index.js',
    vendor,
  },
  commonChunkOptions: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
  routes: ['/'],
};
