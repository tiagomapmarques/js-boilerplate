import { packageJson } from './package-json';

const prodEnvironment = {
  VERSION: packageJson.version,
  SERVICES: {
    ASSETS: '/assets/',
  },
};

// eslint-disable-next-line no-default-export
export default prodEnvironment;
