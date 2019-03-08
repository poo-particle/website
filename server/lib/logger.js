const { createLogger } = require('bunyan');
const logger = createLogger({ name: 'api' });

module.exports = {
  logger: {
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
  },
};
