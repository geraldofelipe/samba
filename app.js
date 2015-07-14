"use strict";

module.exports = require('vulpejs')({
  routes: {
    load: {
      first: ['index']
    }
  },
  models: {
    ignore: true
  },
  security: {
    ignore: true
  },
  debug: false,
  env: 'development',
  version: '0.0.1',
  release: 'BETA',
  minifier: {
    development: false,
    test: false,
    production: true
  }
});