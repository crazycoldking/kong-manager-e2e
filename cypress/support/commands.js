
Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});


Cypress.Commands.add('apiRequest', (method, url, body = {}) => {
  return cy.request({
    method,
    url,
    body,
    failOnStatusCode: false
  });
});


Cypress.Commands.add('clickWhenVisible', (selector) => {
  cy.get(selector).should('be.visible').click();
});


Cypress.Commands.add('scrollAndVerifyVisible', (testId) => {
  cy.get(`[data-testid="${testId}"]`)
    .scrollIntoView({ duration: 1000, easing: 'swing' })
    .should('be.visible');
});


Cypress.Commands.add('cleanUpRoutesAndServices', () => {
  cy.request('GET', 'http://localhost:8001/default/routes')
    .then((response) => {
      response.body.data.forEach((route) => {
        cy.request('DELETE', `http://localhost:8001/routes/${route.id}`);
      });
    });
  cy.request('GET', 'http://localhost:8001/default/services')
    .then((response) => {
      response.body.data.forEach((service) => {
        cy.request('DELETE', `http://localhost:8001/services/${service.name}`);
      });
    });
});
