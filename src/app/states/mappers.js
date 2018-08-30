import { componentMappings } from 'vuex-automap';

import { module as locale } from './locale';
import { module as metric } from './metric';
import { module as forecast } from './forecast';
import { module as mockapi } from './mockapi';

export const mappers = {
  locale: componentMappings('locale', locale),
  metric: componentMappings('metric', metric),
  forecast: componentMappings('forecast', forecast),
  mockapi: componentMappings('mockapi', mockapi),
};
