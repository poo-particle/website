const { createLogger } = require('bunyan');
const { createStream } = require('bunyan-logstash-tcp');

const logger = createLogger({
  name: 'api',
  streams: [
    {
      type: 'raw',
      stream: createStream({
        host: '0.0.0.0',
        port: 5001,
      }),
    },
    {
      stream: process.stdout,
      level: 'info',
    },
  ],
});

module.exports = {
  logger: {
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
  },
};
