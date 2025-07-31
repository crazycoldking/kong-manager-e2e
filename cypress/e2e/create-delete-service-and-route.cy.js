import { devices } from '../support/devices';
import { ensureSidebarItemVisible, ensureSidebarToggleInActive } from '../support/utils';
import { GatewayServicesPage } from '../selectors/Gateway-Services-page';
import { Layout } from '../selectors/common/layout';
import { OverviewPage } from '../selectors/Overview';
import { RoutesPage } from '../selectors/Routes-page';

devices.forEach(device => {
  describe(`Kong Manager UI Test on ${device.name}`, () => {

    before(() => {
      cy.cleanUpRoutesAndServices();
    })

    beforeEach(() => {
      cy.visit(Cypress.env('KONG_BASE_URL') + `/default/overview`);
      cy.viewport(device.viewport.width, device.viewport.height);
    });

    it('should create a service with metadata', () => {
      cy.fixture('service_info.json').then((serviceData) => {
        ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
        cy.get(Layout.sidebarItemsOverview).click();
        ensureSidebarToggleInActive(device);
        cy.get(Layout.actionButton).click();

        // save button is inactive
        cy.get(GatewayServicesPage.submitButton).should('be.disabled');

        // Common service creation steps
        cy.get(GatewayServicesPage.urlInput).type(serviceData.url);
        // view advanced fields
        cy.get(GatewayServicesPage.viewAdvancedFieldsCollapseTrigger).click();
        cy.get(GatewayServicesPage.retryLabel).should('be.visible');
        cy.get(GatewayServicesPage.retryInput).clear().type(serviceData.retries.toString());
        cy.get(GatewayServicesPage.connectTimeoutLabel).should('be.visible');
        cy.get(GatewayServicesPage.connectTimeoutInput).clear().type(serviceData.connect_timeout.toString());
        cy.get(GatewayServicesPage.writeTimeoutLabel).should('be.visible');
        cy.get(GatewayServicesPage.writeTimeoutInput).clear().type(serviceData.write_timeout.toString());
        cy.get(GatewayServicesPage.readTimeoutLabel).should('be.visible');
        cy.get(GatewayServicesPage.readTimeoutInput).clear().type(serviceData.read_timeout.toString());
        cy.get(GatewayServicesPage.clientCertificateLabel).should('be.visible');
        cy.get(GatewayServicesPage.caCertificatesLabel).should('be.visible');
        cy.get(GatewayServicesPage.tlsVerifyLabel).should('be.visible');
        cy.get(GatewayServicesPage.tlsVerifyCheckbox).check();

        // add name
        cy.get(GatewayServicesPage.nameInput).clear().type(serviceData.name);
        // add tags
        cy.get(GatewayServicesPage.tagsCollapseTrigger).click();
        cy.get(GatewayServicesPage.tagsInput).type(serviceData.tags.join(', '));
        // view configuration
        cy.get(GatewayServicesPage.viewConfigurationButton).click();
        cy.get(GatewayServicesPage.configurationTitle).should('be.visible');
        cy.get(GatewayServicesPage.closeConfigurationButton).click();

        cy.get(GatewayServicesPage.submitButton).click();
        cy.get(GatewayServicesPage.title).should('have.text', 'test-service').should('be.visible');
      })
    });

    // verify the service count and route count in overview page
    it('should verify the service count and route count in overview page', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemsOverview).click();
      ensureSidebarToggleInActive(device);
      cy.get(OverviewPage.title).should('have.text', 'Overview');
      cy.get(OverviewPage.serviceCount).should('have.text', '1');
      cy.get(OverviewPage.routeCount).should('have.text', '0');
    })

    // verify the service is created in Gateway Service page
    it('should verify the service is created in Gateway Service page', () => {
      ensureSidebarItemVisible(Layout.sidebarItemGatewayServices, device);
      cy.get(Layout.sidebarItemGatewayServices).click();
      ensureSidebarToggleInActive(device);
      // check lable of Gateway Services
      cy.get(GatewayServicesPage.title).should('have.text', 'Gateway Services');
      cy.get(GatewayServicesPage.serviceNameLink).should('have.text', 'test-service');
      cy.get(GatewayServicesPage.protocol).should('have.text', 'http');
      cy.get(GatewayServicesPage.host).should('have.text', 'test-service.com');
      cy.get(GatewayServicesPage.port).should('have.text', '80');
      cy.get(GatewayServicesPage.tags).should('have.text', 'test-tag');
    });

    // verify service via kong admin api
    it('should verify service created via kong admin api', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('KONG_ADMIN_URL')}/services`,
        auth: {
          type: 'basic',
          username: 'admin',
          password: 'admin',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(1);
        expect(response.body.data[0].name).to.eq('test-service');
      });
    });

    // create a route with metadata in json file
    it('should create a route with metadata', () => {
      cy.fixture('route_info.json').then((routeData) => {
        ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
        cy.get(Layout.sidebarItemGatewayServices).click();
        ensureSidebarToggleInActive(device);
        cy.get(GatewayServicesPage.title).should('have.text', 'Gateway Services');

        cy.get(GatewayServicesPage.serviceNameLink).click();
        cy.get(GatewayServicesPage.addARouteButton).click();

        // select advanced radio button
        cy.get(RoutesPage.advancedRadioButton).click();
        // select basic radio button
        cy.get(RoutesPage.basicRadioButton).click();

        // Common route creation steps using metadata
        cy.get(RoutesPage.nameInput).type(routeData.name);
        // select a service 
        cy.get(RoutesPage.tagsInput).type(routeData.tags.join(', '));
        cy.get(RoutesPage.pathsInput).type(routeData.paths[0]);
        cy.get(RoutesPage.hostsInput).type(routeData.hosts[0]);
        cy.get(RoutesPage.methodsMultiselect).click();
        cy.get(RoutesPage.getMethodItem).click();
        cy.get(Layout.body).click();

        cy.get(RoutesPage.submitButton).click();
      });
    });

    // verify the service and route count in Overview page
    it('should verify the service and route count in Overview page', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemsOverview).click();
      ensureSidebarToggleInActive(device);
      cy.get(OverviewPage.title).should('have.text', 'Overview');
      cy.get(OverviewPage.serviceCount).should('have.text', '1');
      cy.get(OverviewPage.routeCount).should('have.text', '1');
    });

    // verify the route is created in Routes page
    it('should verify the route is created in Routes page', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemRoutes).click();
      ensureSidebarToggleInActive(device);
      cy.get(RoutesPage.routeName).should('have.text', 'test-route');
      cy.get(RoutesPage.hosts).should('have.text', 'test-service.com');
      cy.get(RoutesPage.tags).should('have.text', 'test-route-tag');
      cy.get(RoutesPage.routeName).click();
      cy.get(RoutesPage.title).should('have.text', 'test-route');
    });

    // verify route via kong admin api
    it('should verify route created via kong admin api', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('KONG_ADMIN_URL')}/routes`,
        auth: {
          type: 'basic',
          username: 'admin',
          password: 'admin',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(1);
        expect(response.body.data[0].name).to.eq('test-route');
      });
    });

    // clean up the routes
    it('should clean up the routes', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemRoutes).click();
      ensureSidebarToggleInActive(device);
      cy.get(RoutesPage.routeName).click();
      cy.get(Layout.headerActions).click();
      cy.get(Layout.dangerEntityButton).click();
      cy.get(Layout.confirmationInput).type('test-route');
      cy.get(Layout.modalActionButton).click();
    });

    // verify route is deleted via kong admin api
    it('should verify route is deleted status via kong admin api', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('KONG_ADMIN_URL')}/routes`,
        auth: {
          type: 'basic',
          username: 'admin',
          password: 'admin',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(0);
      });
    });

    // clean up services
    it('should clean up services', () => {
      ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
      cy.get(Layout.sidebarItemGatewayServices).click();
      ensureSidebarToggleInActive(device);
      cy.get(GatewayServicesPage.serviceNameLink).click();
      cy.get(Layout.headerActions).click();
      cy.get(Layout.dangerEntityButton).click();
      cy.get(Layout.confirmationInput).type('test-service');
      cy.get(Layout.modalActionButton).click();
    });

    // verify service is deleted via kong admin api
    it('should verify service is deleted status via kong admin api', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('KONG_ADMIN_URL')}/services`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(0);
      });
    });

  });

});