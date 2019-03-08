const Hapi = require('hapi');
const debug = require('debug')('Server');
const inert = require('inert');

const routes = require('./server/routes');

process.on('uncaughtException', (err) => {
  debug(err);
  process.exit(1);
});

const server = Hapi.Server({
  port: 5000,
  host: 'localhost',
});

server.route(routes);

(async () => {
  await server.register(inert);
  await server.start();
  debug(`Server running at : ${server.info.uri}`);
})();
