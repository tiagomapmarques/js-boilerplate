import Vue from 'vue';

import { PageContainerComponent } from 'modules/ui';

import { BaseContainer } from 'containers/base.container';
import template from './about.template';

export const AboutContainer = {
  ...BaseContainer,
  ...template,

  components: {
    'page-container': PageContainerComponent,
  },

  data() {
    return {
      info: `${VARIABLES.TITLE} v${VARIABLES.VERSION} using Vue v${Vue.version}`,
    };
  },
};
