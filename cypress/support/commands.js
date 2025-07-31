
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
