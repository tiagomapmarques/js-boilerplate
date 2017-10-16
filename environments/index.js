
const defaultEnvironment = 'dev';

export default (env) => {
  const environment = env || defaultEnvironment;
  const config = require(`./${environment}.environment`);
  return { environment, config };
};
