import 'browser-polyfills';
import loadEntry from 'load-entry';

import './index.style';

export const indexEntry = () => {
  // eslint-disable-next-line no-console
  console.log('Hello World!');
};

loadEntry(indexEntry);
