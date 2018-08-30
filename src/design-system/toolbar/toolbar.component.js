import { BaseUiComponent } from 'design-system/base-ui';

import template from './toolbar.template';
import styles from './toolbar.style';

export const ToolbarComponent = {
  ...BaseUiComponent,
  ...template,

  data() {
    return {
      styles,
    };
  },
};
