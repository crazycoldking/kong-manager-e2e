import { selectors } from './selectors';

export const ensureSidebarItemVisible = (itemSelector, device) => {
  cy.get('body').then($body => {
    if (device.viewport.width <= 1024) {
      cy.get(selectors.layout.sidebarMenuToggle).click();
    }
    cy.get(itemSelector).should('be.visible');
  });
}