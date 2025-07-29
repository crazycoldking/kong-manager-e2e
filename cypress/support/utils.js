import { Layout } from '../selectors/common/layout';

export const ensureSidebarItemVisible = (itemSelector, device) => {
  cy.get('body').then($body => {
    if (device.viewport.width <= 1024) {
      cy.get(Layout.sidebarMenuToggle).click();
    }
    cy.get(itemSelector).should('be.visible');
  });
};