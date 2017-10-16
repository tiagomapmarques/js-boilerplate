
import getConfig from './environments';

const nodeEnvMap = {
  local: 'local',
  dev: 'development',
  prod: 'production',
};

export default (configName) => {
  const env = getConfig(configName);

  // Set the global environment
  process.env.NODE_ENV = nodeEnvMap[env.environment];

  return env.config;
};
