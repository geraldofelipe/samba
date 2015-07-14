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
      host: 'ds047722.mongolab.com',
      port: 47722,
      name: 'heroku_lrwkp2rq',
      auth: {
        source: 'heroku_lrwkp2rq',
        user: 'testappsamba',
        pass: 'q1w2e3r4'
      }
    }
  },
  session: {
    mongo: {
      development: {
        host: 'ds047722.mongolab.com',
        port: 47722,
        db: 'heroku_lrwkp2rq',
        collection: 'session',
        auth: {
          source: 'heroku_lrwkp2rq',
          user: 'testappsamba',
          pass: 'q1w2e3r4'
        }
      }
    }
  },
  security: {
    routes: [{
      uri: '/**',
      roles: ['SUPER', 'ADMIN']
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