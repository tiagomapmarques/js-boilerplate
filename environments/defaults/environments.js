
export const envMap = {
  local: 'local',
  dev: 'development',
  prod: 'production',
};

export const envSetup = (environment) => ({
  'process.env': {
    NODE_ENV: `'${environment}'`,
  },
});
