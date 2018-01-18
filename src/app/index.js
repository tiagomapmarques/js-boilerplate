import 'browser-polyfills';
import loadEntry from 'load-entry';
import Inferno from 'inferno';

import { HomeComponent } from 'app/home';

import './index.style';

export const indexEntry = () => {
  Inferno.render(
    <HomeComponent />,
    document.getElementById('app'),
  );
};

loadEntry(exports);
