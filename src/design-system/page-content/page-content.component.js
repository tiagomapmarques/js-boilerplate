import { BaseUiComponent } from 'design-system/base-ui';

import template from './page-content.template';
import styles from './page-content.style';

export const PageContentComponent = {
  ...BaseUiComponent,
  ...template,

  data() {
    return {
      styles,
    };
  },
};
