import { BaseUiComponent, HeroComponent } from 'design-system';

import { NavToolbarComponent } from 'modules/ui/nav-toolbar';

import template from './top-toolbar.template';
import styles from './top-toolbar.style';

export const TopToolbarComponent = {
  ...BaseUiComponent,
  ...template,

  props: [
    ...BaseUiComponent.props,
    'routeName',
  ],

  components: {
    hero: HeroComponent,
    'nav-toolbar': NavToolbarComponent,
  },

  data() {
    return {
      styles,
      title: VARIABLES.TITLE,
    };
  },
};
