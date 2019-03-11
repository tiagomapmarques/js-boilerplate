import 'browser-polyfills';
import loadEntry from 'load-entry';
import Vue from 'vue';

// FIXME: False positive - https://github.com/typescript-eslint/typescript-eslint/issues/45
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => new Vue({
  el: `#${PROJECT.ROOTID}`,
  render() {
    return <HomeComponent />;
  },
});

loadEntry(indexEntry);
