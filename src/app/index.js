import 'browser-polyfills';
import loadEntry from 'load-entry';
import React from 'react';
import ReactDOM from 'react-dom';

import { HomeComponent } from 'app/home';

import './index.style';

export const indexEntry = () => {
  ReactDOM.render(
    <HomeComponent />,
    document.getElementById('app'),
  );
};

loadEntry(exports);
