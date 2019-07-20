/* eslint-disable import/no-extraneous-dependencies */
import LocalWebServer from 'local-web-server';
import reduceFlatten from 'reduce-flatten';
import opn from 'open';
/* eslint-enable import/no-extraneous-dependencies */
import os from 'os';

import { findPort } from './find-ports';

const server = (port, open, spa, https) => {
  LocalWebServer.create({
    port,
    https,
    compress: true,
    directory: 'public',
    spa: spa ? 'index.html' : undefined,
  });

  const ipList = Object.keys(os.networkInterfaces())
    .map(key => os.networkInterfaces()[key])
    .reduce(reduceFlatten, [])
    .filter(networkInterface => networkInterface.family === 'IPv4')
    .map(networkInterface => networkInterface.address);

  ipList.unshift(os.hostname());
  const urls = ipList.map(address => `http${https ? 's' : ''}://${address}:${port}`);

  // eslint-disable-next-line no-console
  console.log(`\n\nServing at ${urls.join(', ')}\n\n`);

  if (open) {
    opn(urls[0]);
  }
};

class ServeAfterFirstBuildPlugin {
  constructor(options) {
    this.isFirstCompilation = true;
    this.port = findPort(options.port || 8000);
    this.open = options.open || false;
    this.spa = options.spa || false;
    this.secure = options.secure || false;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('ServeAfterFirstBuild', () => {
      if (this.isFirstCompilation) {
        this.isFirstCompilation = false;
        server(this.port, this.open, this.spa, this.secure);
      }
    });
  }
}

export const addServer = (config, options) => config.plugins
  .push(new ServeAfterFirstBuildPlugin(options));
