import { vendorPackages } from 'project-packages-filters';

export const modules = {
  entries: {
    app: './index.js',
    vendor: vendorPackages(),
  },
  chunkOverrides: {
    name: 'vendor',
    minChunks: Infinity,
  },
  output: '[name].js',
};
