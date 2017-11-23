import { vendorPackages } from 'project-packages-filters';

const vendorExceptions = {
  literals: [],
  regex: [],
};

const vendor = vendorPackages(vendorExceptions);
// eslint-disable-next-line no-console
console.log('vendor packages:', vendor);

export const modules = {
  entries: {
    app: './index.js',
    vendor,
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
