import { getConfig } from './environments/webpack';

// eslint-disable-next-line no-default-export
export default (configName) => {
  const { environment, config } = getConfig(configName);

  // Set the global environment
  process.env.NODE_ENV = environment;

  return config;
};
