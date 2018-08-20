// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { variables } from './webpack-variables';
import { mockStyle } from './mock-style';
import { TestImports } from './test-imports';

// create environment variables
global.VARIABLES = variables;

// override globals
global.fetch = fetchMock;

// declare test helpers
global.mockStyle = mockStyle;
global.TestImports = TestImports;
