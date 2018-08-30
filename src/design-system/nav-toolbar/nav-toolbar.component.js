import { BaseUiComponent } from 'design-system/base-ui';
import { ToolbarComponent } from 'design-system/toolbar';

import template from './nav-toolbar.template';
import styles from './nav-toolbar.style';

export const NavToolbarComponent = {
  ...BaseUiComponent,
  ...template,

  props: [
    ...BaseUiComponent.props,
    'menuItems',
  ],

  components: {
    toolbar: ToolbarComponent,
  },

  data() {
    return {
      styles,
    };
  },

  methods: {
    activeClass(isItemActive) {
      return isItemActive ? ` ${styles.active}` : '';
    },
  },
};
