import 'browser-polyfills';
import loadEntry from 'load-entry';
import React from 'react';
import ReactDOM from 'react-dom';

import { HomeComponent } from 'components/home';

import './index.style';

export const indexEntry = () => {
  ReactDOM.render(
    <HomeComponent />,
    document.getElementById(PROJECT.ROOTID),
  );
};

loadEntry(indexEntry);
