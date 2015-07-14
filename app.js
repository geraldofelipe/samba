"use strict";

module.exports = require('vulpejs')({
  routes: {
    load: {
      first: ['index']
    }
  },
  models: {
    load: {
      first: ['user', 'history']
    }
  },
  database: {
    development: {
      host: 'activethread.com.br',
      name: 'samba',
      auth: {
        user: 'admin',
        pass: 'q1w2e3r4'
      }
    }
  },
  session: {
    mongo: {
      development: {
        host: 'activethread.com.br',
        db: 'express',
        collection: 'session',
        auth: {
          user: 'admin',
          pass: 'q1w2e3r4'
        }
      }
    }
  },
  security: {
    routes: [{
      uri: '/**',
      roles: ['SUPER', 'ADMIN', 'NORMAL']
    }],
    login: {
      skip: []
    }
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