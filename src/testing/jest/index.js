// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { variables } from './webpack-variables';
import { MockImports } from './mock-imports';
import { mockStyle } from './mock-style';

// create environment variables
global.VARIABLES = variables;

// override globals
global.fetch = fetchMock;

// declare test helpers
global.MockImports = MockImports;
global.mockStyle = mockStyle;
