/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  transform: {
    '^.+\.jsx?$' : 'babel-jest',
  },
};

module.exports = config;