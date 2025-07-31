import { devices } from '../support/devices';
import { ensureSidebarItemVisible } from '../support/utils';
import { Layout } from '../selectors/common/layout';
import { OverviewPage } from '../selectors/Overview';

devices.forEach(device => {
  describe(`Kong Manager UI Test on ${device.name}`, () => {

    beforeEach(() => {
      cy.cleanUpRoutesAndServices();
      cy.visit(Cypress.env('KONG_BASE_URL') + `/default/overview`);
      cy.viewport(device.viewport.width, device.viewport.height);
    });

    it('should check service and route count are 0 by default in Overview page', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemsOverview).click();
      cy.get(OverviewPage.title).should('have.text', 'Overview');
      cy.get(OverviewPage.serviceCount).should('have.text', '0');
      cy.get(OverviewPage.routeCount).should('have.text', '0');
      cy.get(OverviewPage.consumerCount).should('have.text', '0');
      cy.get(OverviewPage.pluginCount).should('have.text', '0');

      // check data quality via kong admin api
      const endpoints = [
        { path: '/services', description: 'service' },
        { path: '/routes', description: 'route' },
        { path: '/consumers', description: 'consumer' },
        { path: '/plugins', description: 'plugin' }
      ];

      endpoints.forEach((endpoint) => {
        cy.checkResourceViaApi(endpoint, 0);
      });

    });

  });
});