import 'browser-polyfills';

import { HomeComponent } from 'app/home';

import './index.style';

export const App = () => {
  const app = new HomeComponent('app');
  app.init().catch();
};
