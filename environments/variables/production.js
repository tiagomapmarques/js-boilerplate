import { packageJson } from './package-json';

export const prodEnvironment = {
  VERSION: packageJson.version,
  SERVICES: {
    ASSETS: '/assets/',
  },
};
