const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    env: {
      KONG_BASE_URL: process.env.KONG_BASE_URL || 'http://localhost:8002',
      KONG_ADMIN_URL: process.env.KONG_ADMIN_URL || 'http://localhost:8001',
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      config.env.ADMIN_USER = process.env.ADMIN_USER;
      config.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      config.env.INVALID_USER = process.env.INVALID_USER;
      config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      
      return config;
    }
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  defaultCommandTimeout: 5000
});