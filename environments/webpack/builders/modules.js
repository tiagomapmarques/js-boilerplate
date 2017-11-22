import { vendorPackages } from 'project-packages-filters';

const vendorExceptions = {
  literals: [],
  regex: [],
};

export const modules = {
  entries: {
    app: './index.js',
    vendor: vendorPackages(vendorExceptions),
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
