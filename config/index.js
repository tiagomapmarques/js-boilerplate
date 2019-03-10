import { environments } from './environments';
import { ServeAfterFirstBuildPlugin } from './serve-after-first-build-plugin';

export const webpackInit = (requestedEnv, { serve, open, spa }) => {
  const actualEnv = (requestedEnv && environments[requestedEnv]) || environments.default;
  process.env.NODE_ENV = actualEnv;

  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { config } = require(`./${actualEnv}.config`);

  if (serve) {
    config.plugins.push(new ServeAfterFirstBuildPlugin({ open, spa }));
  }

  return config;
};
