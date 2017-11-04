
const EnvironmentMap = {
  local: 'local',
  dev: 'development',
  prod: 'production',
};

const defaultEnvironment = 'dev';

export const getConfig = (requestedEnv) => {
  const env = requestedEnv || defaultEnvironment;
  const environment = EnvironmentMap[env];
  const config = require(`./${env}.environment`);
  return { environment, config };
};
