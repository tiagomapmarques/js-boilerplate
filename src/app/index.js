import 'browser-polyfills';
import loadEntry from 'load-entry';

import { HomeComponent } from 'app/home';

import './index.style';

export const indexEntry = () => {
  const app = new HomeComponent();
  app.create().catch();
};

loadEntry(exports);
