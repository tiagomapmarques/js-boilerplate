import { BaseUiComponent, PageBodyComponent } from 'design-system';

import { PageContentComponent } from 'modules/ui/page-content';
import { TopToolbarComponent } from 'modules/ui/top-toolbar';
import { BottomToolbarComponent } from 'modules/ui/bottom-toolbar';

import template from './page-container.template';
import styles from './page-container.style';

export const PageContainerComponent = {
  ...BaseUiComponent,
  ...template,

  props: [
    ...BaseUiComponent.props,
    'routeName',
  ],

  components: {
    'page-body': PageBodyComponent,
    'top-toolbar': TopToolbarComponent,
    'page-content': PageContentComponent,
    'bottom-toolbar': BottomToolbarComponent,
  },

  data() {
    return {
      styles,
      rootId: VARIABLES.ROOTID,
    };
  },
};
