import 'browser-polyfills';

import { HomeComponent } from 'app/home';

import './index.style';

document.addEventListener('DOMContentLoaded', () => {
  const app = new HomeComponent('app');
  app.init().catch();
});
