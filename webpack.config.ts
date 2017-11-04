import * as webpack from 'webpack';

import { ProjectEnvironment, getConfig } from './environments';

export default (configName: ProjectEnvironment): webpack.Configuration => { // tslint:disable-line:no-default-export
  const { environment, config } = getConfig(configName);

  // Set the global environment
  process.env.NODE_ENV = environment;

  return config;
};
