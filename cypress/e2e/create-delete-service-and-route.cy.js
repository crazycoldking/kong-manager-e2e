import { devices } from '../support/devices';


devices.forEach(device => {
  describe(`Workspace UI Test on ${device.name}`, () => {
    beforeEach(() => {
      cy.visit(`http://localhost:8002/default/overview`);
      cy.viewport(device.viewport.width, device.viewport.height);
    });

    // Helper function to handle responsive sidebar interaction
    const ensureSidebarItemVisible = (itemSelector) => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          cy.get('.sidebar-menu-toggle').click();
        }
        cy.get(itemSelector).should('be.visible');
      });
    };

    it('should create a service with metadata', () => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          // Tablet view: need to open sidebar first
          cy.get('.sidebar-menu-toggle').click();
          cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click();
          cy.get('[data-testid="empty-state-action"]').click();
        } else {
          // Desktop view: direct access
          cy.get('[data-testid="action-button"]').click();
        }
      });

      // Common service creation steps
      cy.get('[data-testid="gateway-service-url-input"]').type('http://test-service.com');
      cy.get('[data-testid="gateway-service-name-input"]').clear().type('test-service');
      cy.get('[data-testid="tags-collapse"] [data-testid="collapse-trigger-content"]').click();
      cy.get('[data-testid="gateway-service-tags-input"]').type('test-tag');
      cy.get('[data-testid="service-create-form-submit"]').click();
      cy.get('.title').should('have.text', 'test-service').should('be.visible');
    });


    it('should verify the service is created', () => {
      ensureSidebarItemVisible('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link');
      cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click();
      cy.get('[data-testid="test-service"] > [data-testid="name"] b').should('have.text', 'test-service');
      cy.get('[data-testid="protocol"] > .cell-wrapper > .content-wrapper').should('have.text', 'http');
      cy.get('[data-testid="host"] > .cell-wrapper > .content-wrapper').should('have.text', 'test-service.com');
      cy.get('[data-testid="port"] > .cell-wrapper > .content-wrapper').should('have.text', '80');
      cy.get('[data-testid="tags"] > .cell-wrapper > .content-wrapper').should('have.text', 'test-tag');
    });

    it('should create a route with metadata', () => {
      cy.get('body').then($body => {
        if (device.viewport.width <= 1024) {
          // Tablet view
          cy.get('.sidebar-menu-toggle').click();
          cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link').click();
          cy.get('[data-testid="empty-state-action"]').click();
        } else {
          // Desktop view
          cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click();
          cy.get('[data-testid="test-service"] > [data-testid="name"] b').click();
          cy.get('.alert-message > .k-button').click();
        }
      });

      // Common route creation steps
      cy.get('[data-testid="route-form-name"]').type('test-route');
      cy.get('[data-testid="route-form-tags"]').type('test-route-tag');
      cy.get('[data-testid="route-form-paths-input-1"]').type('/test-route');
      cy.get('[data-testid="route-form-hosts-input-1"]').type('test-service.com');
      cy.get('.multiselect-icons-container').click();
      cy.get('[data-testid="multiselect-item-GET"] > .multiselect-item-container > button > .multiselect-item-label').click();
      cy.get('body').click();
      cy.get('[data-testid="route-create-form-submit"]').click();
    });

    it('should verify the route is created', () => {
      ensureSidebarItemVisible('[data-testid="sidebar-item-routes"] > .sidebar-item-link');
      cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link').click();
      cy.get('b').should('have.text', 'test-route');
      cy.get('[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper').should('have.text', 'test-service.com');
      cy.get('[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper').should('have.text', 'test-route-tag');
    });

    it('should clean up the route', () => {
      ensureSidebarItemVisible('[data-testid="sidebar-item-routes"] > .sidebar-item-link');
      cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link').click();
      cy.get('b').click();
      cy.get('[data-testid="header-actions"]').click();
      cy.get('.danger > [data-testid="entity-button"]').click();
      cy.get('[data-testid="confirmation-input"]').type('test-route');
      cy.get('[data-testid="modal-action-button"]').click();
    });

    it('should clean up service', () => {
      ensureSidebarItemVisible('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link');
      cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link').click();
      cy.get('[data-testid="test-service"] > [data-testid="name"] b').click();
      cy.get('[data-testid="header-actions"]').click();
      cy.get('.danger > [data-testid="entity-button"]').click();
      cy.get('[data-testid="confirmation-input"]').type('test-service');
      cy.get('[data-testid="modal-action-button"]').click();
    });

  });
});