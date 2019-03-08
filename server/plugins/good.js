const good = require('good');
const { logger } = require('../lib/logger');

module.exports = {
  plugin: good,
  options: {
    reporters: {
      consoleReporter: [
        {
          module: 'good-bunyan',
          args: [
            { response: '*', log: '*', error: '*', request: '*' },
            {
              logger,
              levels: {
                response: 'info',
                error: 'error',
                request: 'info',
              },
            },
          ],
        },
      ],
    },
  },
};
