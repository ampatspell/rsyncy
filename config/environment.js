/* eslint-env node */
'use strict';

const electron = !!process.env.EMBER_CLI_ELECTRON;

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'rsyncy-app',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
    },
    APP: {
    },
    rsyncy: {
      electron
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
