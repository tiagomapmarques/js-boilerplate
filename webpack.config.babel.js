import { getConfig } from './environments/webpack';

export const webpackInit = (configName) => {
  const { environment, config } = getConfig(configName);

  // Set the global environment
  process.env.NODE_ENV = environment;

  return config;
};

// eslint-disable-next-line no-default-export
export default webpackInit;
