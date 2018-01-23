module.exports = Object.assign({}, require('mdu-scripts/jest'), {
  roots: ['src', 'types'],
  testEnvironment: 'jsdom',
})
