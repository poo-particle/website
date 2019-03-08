const Hapi = require('hapi');
const boom = require('boom');
const config = require('config');

const plugins = require('./plugins');

function isTestEnv() {
  return Boolean(module.parent) && process.env.NODE_ENV === 'testing';
}

module.exports = {
  async createServer({ host = '0.0.0.0', port = 3000 }) {
    const server = Hapi.server({
      port,
      host,
      routes: {
        validate: {
          failAction: (req, h, err) => {
            if (!['production', 'staging'].includes(process.env.NODE_ENV)) {
              throw err;
            }

            throw boom.badRequest(`Invalid request payload input`);
          },
        },
      },
    });

    await server.register(plugins, {
      routes: { prefix: '/api' },
    });

    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.pub,
      validate: (/* Decoded, req */) => {
        // TODO:
        return { isValid: true };
      },
      verifyOptions: { algorithms: ['RS256'] },
    });

    server.auth.default('jwt');

    return {
      async start() {
        await server.initialize();

        if (!isTestEnv()) {
          await server.start();

          server.log('info', { msg: 'Server started.', uri: server.info.uri });

          return;
        }

        return server;
      },
      stop() {
        return server.stop();
      },
    };
  },
};
