import { variables } from '../../environments/variables';

const { ENVIRONMENT } = variables(process.env.NODE_ENV);

export const environment = ENVIRONMENT;
