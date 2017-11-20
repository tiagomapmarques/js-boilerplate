import { packageJson } from './package-json';

const devEnvironment = {
  VERSION: packageJson.version,
  SERVICES: {
    ASSETS: '/assets/',
  },
};

// eslint-disable-next-line no-default-export
export default devEnvironment;
