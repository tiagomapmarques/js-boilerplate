import { BaseUiComponent, NavToolbarComponent as BaseNavToolbarComponent } from 'design-system';

import template from './nav-toolbar.template';
import styles from './nav-toolbar.style';

export const NavToolbarComponent = {
  ...BaseUiComponent,
  ...template,

  props: [
    ...BaseUiComponent.props,
    'routeName',
  ],

  components: {
    'nav-toolbar': BaseNavToolbarComponent,
  },

  computed: {
    ...BaseUiComponent.computed,

    menuItems() {
      return [
        {
          routeName: 'home',
          text: 'Home',
          active: this.routeName === 'home',
        },
        {
          routeName: 'about',
          text: 'About',
          active: this.routeName === 'about',
        },
      ];
    },
  },

  data() {
    return {
      styles,
    };
  },
};
