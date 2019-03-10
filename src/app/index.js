import 'browser-polyfills';
import loadEntry from 'load-entry';
import Vue from 'vue';

import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => new Vue({
  el: `#${PROJECT.ROOTID}`,
  render: h => h(HomeComponent),
});

loadEntry(indexEntry);
