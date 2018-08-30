import Vue from 'vue';
import { ToolbarComponent } from 'design-system';

import { StringService } from 'services';

import template from './bottom-toolbar.template';
import styles from './bottom-toolbar.style';

export const BottomToolbarComponent = {
  ...template,

  components: {
    toolbar: ToolbarComponent,
  },

  data() {
    return {
      styles,
      title: VARIABLES.TITLE,
      vueVersion: StringService.removeVersionPatch(Vue.version),
      version: StringService.removeVersionPatch(VARIABLES.VERSION),
    };
  },
};
