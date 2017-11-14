
import { getConfig } from './config';

export default (configName) => {
  const { environment, config } = getConfig(configName);

  // Set the global environment
  process.env.NODE_ENV = environment;

  return config;
};
