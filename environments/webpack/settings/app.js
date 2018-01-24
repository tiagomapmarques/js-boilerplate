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
  entries: {
    app: 'index.js',
    vendor,
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
