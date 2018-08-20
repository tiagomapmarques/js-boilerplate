import { getVariables } from '../../../config/runtime';

const { VARIABLES } = getVariables(process.env.NODE_ENV);

export const variables = VARIABLES;
