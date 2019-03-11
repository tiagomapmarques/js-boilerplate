/* eslint-disable import/no-extraneous-dependencies */
import 'raf/polyfill';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
/* eslint-enable import/no-extraneous-dependencies */

import { variables } from './webpack-variables';
import { MockImports } from './mock-imports';
import { mockStyle } from './mock-style';

enzyme.configure({ adapter: new Adapter() });

// create environment variables
global.ENVIRONMENT = variables.ENVIRONMENT;
global.PROJECT = variables.PROJECT;
global.DEFAULTS = variables.DEFAULTS;
global.SERVICES = variables.SERVICES;

// override globals
global.fetch = fetchMock;

// declare test helpers
global.MockImports = MockImports;
global.mockStyle = mockStyle;
