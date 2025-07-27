import { devices } from '../support/devices';
import { selectors } from '../support/selectors';


devices.forEach(device => {
  describe(`Workspace UI Test on ${device.name}`, () => {
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
      cy.get(selectors.serviceCreatePage.nameInput).clear().type('test-service');
      cy.get(selectors.serviceCreatePage.tagsCollapseTrigger).click();
      cy.get(selectors.serviceCreatePage.tagsInput).type('test-tag');
      cy.get(selectors.serviceCreatePage.submitButton).click();
      cy.get(selectors.serviceCreatePage.title).should('have.text', 'test-service').should('be.visible');
    });


    it('should verify the service is created', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
      cy.get(selectors.layout.sidebarItemGatewayServices).click();
      cy.get(selectors.serviceListPage.serviceNameLink).should('have.text', 'test-service');
      cy.get(selectors.serviceListPage.protocol).should('have.text', 'http');
      cy.get(selectors.serviceListPage.host).should('have.text', 'test-service.com');
      cy.get(selectors.serviceListPage.port).should('have.text', '80');
      cy.get(selectors.serviceListPage.tags).should('have.text', 'test-tag');
    });

    it('should create a route with metadata', () => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          // Tablet view
          cy.get(selectors.layout.sidebarMenuToggle).click();
          cy.get(selectors.layout.sidebarItemRoutes).click();
          cy.get(selectors.layout.emptyStateAction).click();
        } else {
          // Desktop view
          cy.get(selectors.layout.sidebarItemGatewayServices).click();
          cy.get(selectors.serviceListPage.serviceNameLink).click();
          cy.get('.alert-message > .k-button').click();
        }
      });

      // Common route creation steps
      cy.get(selectors.routeCreatePage.nameInput).type('test-route');
      cy.get(selectors.routeCreatePage.tagsInput).type('test-route-tag');
      cy.get(selectors.routeCreatePage.pathsInput).type('/test-route');
      cy.get(selectors.routeCreatePage.hostsInput).type('test-service.com');
      cy.get(selectors.routeCreatePage.methodsMultiselect).click();
      cy.get(selectors.routeCreatePage.getMethodItem).click();
      cy.get('body').click();
      cy.get(selectors.routeCreatePage.submitButton).click();
    });

    it('should verify the route is created', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemRoutes);
      cy.get(selectors.layout.sidebarItemRoutes).click();
      cy.get(selectors.routeListPage.routeName).should('have.text', 'test-route');
      cy.get(selectors.routeListPage.hosts).should('have.text', 'test-service.com');
      cy.get(selectors.routeListPage.tags).should('have.text', 'test-route-tag');
    });

    it('should clean up the route', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemRoutes);
      cy.get(selectors.layout.sidebarItemRoutes).click();
      cy.get(selectors.routeListPage.routeName).click();
      cy.get(selectors.layout.headerActions).click();
      cy.get(selectors.layout.dangerEntityButton).click();
      cy.get(selectors.layout.confirmationInput).type('test-route');
      cy.get(selectors.layout.modalActionButton).click();
    });

    it('should clean up service', () => {
      ensureSidebarItemVisible(selectors.layout.sidebarItemGatewayServices);
      cy.get(selectors.layout.sidebarItemGatewayServices).click();
      cy.get(selectors.serviceListPage.serviceNameLink).click();
      cy.get(selectors.layout.headerActions).click();
      cy.get(selectors.layout.dangerEntityButton).click();
      cy.get(selectors.layout.confirmationInput).type('test-service');
      cy.get(selectors.layout.modalActionButton).click();
    });

  });
});