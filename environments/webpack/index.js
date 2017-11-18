import { environments } from '../';
import { localConfig } from './local.config';
import { devConfig } from './dev.config';
import { prodConfig } from './prod.config';

const webpackConfigs = {
  local: localConfig,
  dev: devConfig,
  prod: prodConfig,
};

export const getConfig = requestedEnv => ({
  environment: environments[requestedEnv],
  config: webpackConfigs[requestedEnv],
});
