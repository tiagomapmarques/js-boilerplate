import 'browser-polyfills';
import loadEntry from 'load-entry';

import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => {
  document.getElementById(PROJECT.ROOTID).innerHTML = `<${HomeComponent.componentName} />`;
};

loadEntry(indexEntry, { event: 'WebComponentsReady' });
