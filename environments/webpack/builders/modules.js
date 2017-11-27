import { vendorPackages } from 'project-packages-filters';

import { paths } from './paths';

const vendorExceptions = {
  literals: [],
  regex: [],
};

const vendor = vendorPackages(vendorExceptions);
// eslint-disable-next-line no-console
console.log('vendor packages:', vendor);

export const modules = {
  entries: {
    app: `${paths.entriesAbsolute}/index.js`,
    vendor,
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
