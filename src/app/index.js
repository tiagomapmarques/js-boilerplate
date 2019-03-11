import 'browser-polyfills';
import loadEntry from 'load-entry';
import { render } from 'inferno';

import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => {
  // FIXME: workaround for pre-render use - Inferno does not delete the previous content of the node
  document.getElementById(PROJECT.ROOTID).innerHTML = '';

  render(
    <HomeComponent />,
    document.getElementById(PROJECT.ROOTID),
  );
};

loadEntry(indexEntry);
