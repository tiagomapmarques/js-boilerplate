import * as webpack from 'webpack';

export type ProjectEnvironment = 'local' | 'dev' | 'prod';
export type NodeEnvironment = 'local' | 'development' | 'production';

export interface ProjectConfig {
  config: webpack.Configuration;
  environment: string;
}

const EnvironmentMap: { [key: string]: NodeEnvironment } = {
  local: 'local',
  dev: 'development',
  prod: 'production',
};

const defaultEnvironment: ProjectEnvironment = 'dev';

export const getConfig = (requestedEnv: ProjectEnvironment): ProjectConfig => {
  const env = requestedEnv || defaultEnvironment;
  const environment = EnvironmentMap[env];
  const config: webpack.Configuration = require(`./${env}.environment`);
  return { environment, config };
};
