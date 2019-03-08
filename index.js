const config = require('config');
const { createServer } = require('./server');

(async () => {
  const server = await createServer({
    host: config.server.host,
    port: config.server.port,
  });

  process.on('SIGINT', server.stop);
  process.on('SIGTERM', server.stop);

  await server.start();
})();
