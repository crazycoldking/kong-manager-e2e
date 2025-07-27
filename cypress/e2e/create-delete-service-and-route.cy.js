import { devices } from '../support/devices';
import { selectors } from '../support/selectors';


devices.forEach(device => {
  describe(`Kong Manager UI Test on ${device.name}`, () => {
    beforeEach(() => {
      cy.visit(`/default/overview`);
      cy.viewport(device.viewport.width, device.viewport.height);
    });

    // Helper function to handle responsive sidebar interaction
    const ensureSidebarItemVisible = (itemSelector) => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          cy.get(selectors.layout.sidebarMenuToggle).click();
        }
        cy.get(itemSelector).should('be.visible');
      });
    };

    it('should check service and route count are 0 by default', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
      cy.get(selectors.layout.sidebarItemsOverview).click();
      cy.get(selectors.overviewPage.serviceCount).should('have.text', '0');
      cy.get(selectors.overviewPage.routeCount).should('have.text', '0');
    });

    it('should create a service with metadata', () => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          // Tablet view: need to open sidebar first
          cy.get(selectors.layout.sidebarMenuToggle).click();
          cy.get(selectors.layout.sidebarItemGatewayServices).click();
          cy.get(selectors.layout.emptyStateAction).click();
        } else {
          // Desktop view: direct access
          cy.get(selectors.layout.actionButton).click();
        }
      });

      // Common service creation steps
      cy.get(selectors.serviceCreatePage.urlInput).type('http://test-service.com');
      // view advanced fields
      cy.get(selectors.serviceCreatePage.viewAdvancedFieldsCollapseTrigger).click();
      // check lables
      cy.get(selectors.serviceCreatePage.retryLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.retryInput).clear().type('3');
      cy.get(selectors.serviceCreatePage.connectTimeoutLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.connectTimeoutInput).clear().type('30000');
      cy.get(selectors.serviceCreatePage.writeTimeoutLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.writeTimeoutInput).clear().type('30000');
      cy.get(selectors.serviceCreatePage.readTimeoutLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.readTimeoutInput).clear().type('30000');
      cy.get(selectors.serviceCreatePage.clientCertificateLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.caCertificatesLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.tlsVerifyLabel).should('be.visible');
      cy.get(selectors.serviceCreatePage.tlsVerifyCheckbox).check();


      // add name
      cy.get(selectors.serviceCreatePage.nameInput).clear().type('test-service');
      // add tags
      cy.get(selectors.serviceCreatePage.tagsCollapseTrigger).click();
      cy.get(selectors.serviceCreatePage.tagsInput).type('test-tag');
      // view configuration
      cy.get(selectors.serviceCreatePage.viewConfigurationButton).click();
      cy.get(selectors.serviceCreatePage.configurationTitle).should('be.visible');
      cy.get(selectors.serviceCreatePage.closeConfigurationButton).click();

      cy.get(selectors.serviceCreatePage.submitButton).click();
      cy.get(selectors.serviceCreatePage.title).should('have.text', 'test-service').should('be.visible');
    });

    it('should verify the service count and route count in overview page', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemsOverview);
      cy.get(selectors.overviewPage.title).should('have.text', 'Overview');
      cy.get(selectors.overviewPage.serviceCount).should('have.text', '1');
      cy.get(selectors.overviewPage.routeCount).should('have.text', '0');
    });

    it('should verify the service is created in Gateway Service page', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
      cy.get(selectors.layout.sidebarItemGatewayServices).click();
      // check lable of Gateway Services
      cy.get(selectors.gatewayServicesPage.title).should('have.text', 'Gateway Services');
      cy.get(selectors.gatewayServicesPage.serviceNameLink).should('have.text', 'test-service');
      cy.get(selectors.gatewayServicesPage.protocol).should('have.text', 'http');
      cy.get(selectors.gatewayServicesPage.host).should('have.text', 'test-service.com');
      cy.get(selectors.gatewayServicesPage.port).should('have.text', '80');
      cy.get(selectors.gatewayServicesPage.tags).should('have.text', 'test-tag');
    });

    it('should create a route with metadata', () => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          // Tablet view
          ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
          cy.get(selectors.layout.sidebarItemGatewayServices).click();
        } else {
          // Desktop view
          cy.get(selectors.layout.sidebarItemGatewayServices).click();

        }
      });
      cy.get(selectors.gatewayServicesPage.title).should('have.text', 'Gateway Services');

      cy.get(selectors.gatewayServicesPage.serviceNameLink).click();
      cy.get(selectors.gatewayServicesPage.addARouteButton).click();

      // select advanced radio button
      cy.get(selectors.routeCreatePage.advancedRadioButton).click();
      // select basic radio button
      cy.get(selectors.routeCreatePage.basicRadioButton).click();

      // Common route creation steps
      cy.get(selectors.routeCreatePage.nameInput).type('test-route');
      // select a service 
      cy.get(selectors.routeCreatePage.tagsInput).type('test-route-tag');
      cy.get(selectors.routeCreatePage.pathsInput).type('/test-route');
      cy.get(selectors.routeCreatePage.hostsInput).type('test-service.com');
      cy.get(selectors.routeCreatePage.methodsMultiselect).click();
      cy.get(selectors.routeCreatePage.getMethodItem).click();
      cy.get('body').click();

      cy.get(selectors.routeCreatePage.submitButton).click();
    });

    it('should verify the service and route count in Overview page', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemsOverview);
      cy.get(selectors.overviewPage.title).should('have.text', 'Overview');
      cy.get(selectors.overviewPage.serviceCount).should('have.text', '1');
      cy.get(selectors.overviewPage.routeCount).should('have.text', '1');
    });

    it('should verify the route is created in Routes page', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemRoutes);
      cy.get(selectors.layout.sidebarItemRoutes).click();
      cy.get(selectors.routesPage.routeName).should('have.text', 'test-route');
      cy.get(selectors.routesPage.hosts).should('have.text', 'test-service.com');
      cy.get(selectors.routesPage.tags).should('have.text', 'test-route-tag');

      cy.get(selectors.routesPage.routeName).click();
      cy.get(selectors.routeDetailPage.title).should('have.text', 'test-route');
    });

    it('should clean up the route', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemRoutes);
      cy.get(selectors.layout.sidebarItemRoutes).click();
      cy.get(selectors.routesPage.routeName).click();
      cy.get(selectors.layout.headerActions).click();
      cy.get(selectors.layout.dangerEntityButton).click();
      cy.get(selectors.layout.confirmationInput).type('test-route');
      cy.get(selectors.layout.modalActionButton).click();
    });

    it('should clean up service', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
      cy.get(selectors.layout.sidebarItemGatewayServices).click();
      cy.get(selectors.gatewayServicesPage.serviceNameLink).click();
      cy.get(selectors.layout.headerActions).click();
      cy.get(selectors.layout.dangerEntityButton).click();
      cy.get(selectors.layout.confirmationInput).type('test-service');
      cy.get(selectors.layout.modalActionButton).click();
    });

  });
});