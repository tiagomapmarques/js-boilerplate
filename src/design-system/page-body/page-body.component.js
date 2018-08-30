import { BaseUiComponent } from 'design-system/base-ui';

import template from './page-body.template';
import styles from './page-body.style';

export const PageBodyComponent = {
  ...BaseUiComponent,
  ...template,

  data() {
    return {
      styles,
    };
  },
};
