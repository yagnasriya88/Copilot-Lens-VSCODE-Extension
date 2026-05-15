require('ts-node/register');
require('./src/test/setup.js');

module.exports = {
  spec: 'src/test/**/*.test.ts',
  extensions: 'ts',
  ui: 'tdd',
};
