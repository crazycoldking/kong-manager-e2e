import { Layout } from '../selectors/common/layout';

export const ensureSidebarItemVisible = (itemSelector, device) => {
  cy.get('body').then(() => {
    if (device.viewport.width <= 1024) {
      cy.get(Layout.sidebarMenuToggle).click();
    }
    cy.get(itemSelector).scrollIntoView().should('be.visible');
  });
};

export const ensureSidebarToggleInActive = (device) => {
  cy.get('body').then(() => {
    if (device.viewport.width <= 1024) {
      cy.get(Layout.sidebarMenuToggle).should('not.have.class', 'active');
    }
  });
};
