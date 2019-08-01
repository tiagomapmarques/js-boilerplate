// eslint-disable-next-line import/no-extraneous-dependencies
import getPort from 'get-port';
// eslint-disable-next-line import/no-extraneous-dependencies
import synchronizedPromise from 'synchronized-promise';

const getPortSync = synchronizedPromise(getPort);

export const findPort = (port, range = 999) => getPortSync({
  port: getPort.makeRange(port, port + range),
});

export const findPorts = (ports, range) => ports.map(port => findPort(port, range));
