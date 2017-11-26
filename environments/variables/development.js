import { packageJson } from './package-json';

export const devEnvironment = {
  VERSION: packageJson.version,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
