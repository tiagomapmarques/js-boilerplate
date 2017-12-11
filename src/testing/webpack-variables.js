import { getVariables } from '../../environments/variables';

const { VARIABLES } = getVariables(process.env.NODE_ENV);

export const variables = VARIABLES;
