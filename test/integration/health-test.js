const { expect } = require('chai');
const { createServer } = require('../../server');
const pkg = require('../../package');

describe('/health', () => {
  let instance;
  before(async () => {
    const server = await createServer();

    instance = await server.start();
  });

  // after(async () => {
  //   await instance.stop();
  // });

  it('returns a healthy payload', async () => {
    const { result } = await instance.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(result).to.eql({
      app: 'website',
      dependencies: pkg.dependencies,
      status: 'ok',
      version: pkg.version,
    });
  });
});
