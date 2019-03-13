const good = require('good');

module.exports = {
  plugin: good,
  options: {
    reporters: {
      logstash: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', error: '*' }],
        },
        {
          module: 'good-logstash',
          args: [
            'udp://localhost:5000',
            { tags: [`env:${process.env.NODE_ENV}`, 'website'] },
          ],
        },
      ],
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', request: '*', response: '*', error: '*' }],
        },
        {
          module: 'good-console',
        },
        'stdout',
      ],
    },
  },
};
