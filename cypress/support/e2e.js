// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore cross-origin script errors
  return !err.message.includes('Script error');
});

import './commands';

beforeEach(() => {
  cy.viewport(1280, 720);
  cy.clearCookies();
  cy.clearLocalStorage();
});

afterEach(() => {
  
});