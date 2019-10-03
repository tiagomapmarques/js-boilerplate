// eslint-disable-next-line import/no-extraneous-dependencies
const getPort = require('get-port');
// eslint-disable-next-line import/no-extraneous-dependencies
const synchronizedPromise = require('synchronized-promise');

const getPortSync = synchronizedPromise(getPort);

const findPort = (port, range = 999) => getPortSync({
  port: getPort.makeRange(port, port + range),
});

const findPorts = (ports, range) => ports.map((port) => findPort(port, range));

module.exports = {
  findPort,
  findPorts,
};
