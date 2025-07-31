
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
  cy.request('GET', Cypress.env('KONG_ADMIN_URL') + '/default/routes')
    .then((response) => {
      response.body.data.forEach((route) => {
        cy.request('DELETE', Cypress.env('KONG_ADMIN_URL') + `/routes/${route.id}`);
      });
    });
  cy.request('GET', Cypress.env('KONG_ADMIN_URL') + '/default/services')
    .then((response) => {
      response.body.data.forEach((service) => {
        cy.request('DELETE', Cypress.env('KONG_ADMIN_URL') + `/services/${service.name}`);
      });
    });
});

Cypress.Commands.add('checkResourceViaApi', (endpoint, count = 0) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('KONG_ADMIN_URL')}${endpoint.path}`,
    auth: {
      type: 'basic',
      username: 'admin',
      password: 'admin',
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.have.length(count, `${endpoint.description} should be ${count}`);
  });
});
