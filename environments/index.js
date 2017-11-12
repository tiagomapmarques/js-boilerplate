
import { envMap } from './defaults/env-map';

const defaultEnvironment = 'dev';

export const getConfig = (requestedEnv) => {
  const env = requestedEnv || defaultEnvironment;
  const environment = envMap[env];
  const config = require(`./${env}.environment`);
  return { environment, config };
};
