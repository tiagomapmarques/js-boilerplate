import fetchMock from 'jest-fetch-mock';

import { createElement } from './create-element';
import { mockConsole } from './mock-console';
import { TestImports } from './test-imports';

// overriding of global variables
global.fetch = fetchMock;

// global test functions
global.mockConsole = mockConsole;
global.createElement = createElement;
global.TestImports = TestImports;
global.TestImports.reset();
