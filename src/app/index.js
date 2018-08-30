import 'browser-polyfills';
import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';
import { HelperService } from 'services';

import style from './index.style';

export const indexEntry = () => {
  document.head.appendChild(HelperService.createStyleElement(style));

  HomeComponent.register();
  document.getElementById(VARIABLES.ROOTID).innerHTML = '<home-component />';
};

loadEntry(exports, { event: 'WebComponentsReady' });
