import { environments } from './environments';
import { app } from './settings';

export const webpackInit = (requestedEnv, { serve, open, spa }) => {
  const actualEnv = (requestedEnv && environments[requestedEnv]) || environments.default;
  process.env.NODE_ENV = actualEnv;

  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { config } = require(`./${actualEnv}.config`);

  if (serve) {
    // eslint-disable-next-line global-require
    require('./common/add-server').addServer(config, app.port, { open, spa });
  }

  return config;
};
