import { componentMappings } from 'vuex-automap';

import { module as sample } from './sample';

export const mappers = {
  sample: componentMappings('sample', sample),
};
