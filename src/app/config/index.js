
const envConfig = {
  local: require('./local.config').default,
  development: require('./dev.config').default,
  production: require('./prod.config').default,
};

export const config = envConfig[process.env.NODE_ENV];
