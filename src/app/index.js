import 'browser-polyfills';
import loadEntry from 'load-entry';

// FIXME: False positive - https://github.com/typescript-eslint/typescript-eslint/issues/45
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => {
  const app = new HomeComponent();
  app.create().catch();
};

loadEntry(indexEntry);
