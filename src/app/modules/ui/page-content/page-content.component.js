import { BaseUiComponent, PageContentComponent as BasePageContentComponent } from 'design-system';

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

  components: {
    'page-content': BasePageContentComponent,
  },
};
