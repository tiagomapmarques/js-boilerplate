// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { variables } from './webpack-variables';
import { TestImports } from './test-imports';

// creating environment variables
global.VARIABLES = variables;

// overriding globals
global.fetch = fetchMock;

// declaring test helper functions
global.TestImports = TestImports;
