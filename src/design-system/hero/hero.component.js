import { BaseUiComponent } from 'design-system/base-ui';
import { ToolbarComponent } from 'design-system/toolbar';

import template from './hero.template';
import styles from './hero.style';

export const HeroComponent = {
  ...BaseUiComponent,
  ...template,

  data() {
    return {
      styles,
    };
  },

  components: {
    toolbar: ToolbarComponent,
  },
};
