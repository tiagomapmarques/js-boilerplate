import { quotifier } from '../quotifier';

export const variables = (environment) => quotifier({
  'process.env': {
    NODE_ENV: `${environment}`,
  },
  ENVIRONMENT: {
    ...(require(`./${environment}`).default),
  },
});
