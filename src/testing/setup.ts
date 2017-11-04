import 'jest';
import * as fetchMock from 'jest-fetch-mock';

import { createElement } from './create-element';
import { mockConsole } from './mock-console';
import { TestImports } from './test-imports';

const _global: TestGlobal = global as TestGlobal; // tslint:disable-line:variable-name

_global.fetch = fetchMock;
_global._fetch = fetchMock;

_global.mockConsole = mockConsole;
_global._console = console as MockConsole;

_global.createElement = createElement;

_global.TestImports = TestImports;
_global.TestImports.reset();
