// eslint-disable-next-line import/no-extraneous-dependencies
const LocalWebServer = require('local-web-server');
// eslint-disable-next-line import/no-extraneous-dependencies
const opn = require('open');
const reduceFlatten = require('reduce-flatten');
const os = require('os');

const { findPort } = require('./find-ports');

const serve = (port, open, spa, https) => {
  LocalWebServer.create({
    port,
    https,
    compress: true,
    directory: 'public',
    spa: spa ? 'index.html' : undefined,
  });

  const ipList = Object.keys(os.networkInterfaces())
    .map((key) => os.networkInterfaces()[key])
    .reduce(reduceFlatten, [])
    .filter((networkInterface) => networkInterface.family === 'IPv4')
    .map((networkInterface) => networkInterface.address);

  ipList.unshift(os.hostname());
  const urls = ipList.map((address) => `http${https ? 's' : ''}://${address}:${port}`);

  // eslint-disable-next-line no-console
  console.log(`\n\nServing at ${urls.join(', ')}\n\n`);

  if (open) {
    opn(urls[0]);
  }
};

class ServeAfterFirstBuildPlugin {
  constructor(port, options) {
    this.isFirstCompilation = true;
    this.port = findPort(port);
    this.open = options.open || false;
    this.spa = options.spa || false;
    this.secure = options.secure || false;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('ServeAfterFirstBuild', () => {
      if (this.isFirstCompilation) {
        this.isFirstCompilation = false;
        serve(this.port, this.open, this.spa, this.secure);
      }
    });
  }
}

const addServer = (config, port, options) => config.plugins
  .push(new ServeAfterFirstBuildPlugin(port, options));

module.exports = {
  serve,
  addServer,
};
