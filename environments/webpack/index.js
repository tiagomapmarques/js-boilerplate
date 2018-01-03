import { environments } from '../';
import { localConfig } from './local.config';
import { devConfig } from './dev.config';
import { prodConfig } from './prod.config';

const webpackConfigs = {
  local: localConfig,
  dev: devConfig,
  prod: prodConfig,
};

export const webpackInit = (requestedEnv) => {
  process.env.NODE_ENV = environments[requestedEnv];
  return webpackConfigs[requestedEnv];
};
