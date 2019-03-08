const pkg = require('../../package.json');

module.exports = {
  method: 'get',
  path: '/health',
  options: {
    auth: false,
    description: 'Health route',
  },
  handler: () => {
    return {
      status: 'ok',
      app: pkg.name,
      version: pkg.version,
      dependencies: pkg.dependencies,
    };
  },
};
