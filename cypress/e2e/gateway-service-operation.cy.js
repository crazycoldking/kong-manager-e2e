import { devices } from '../support/devices';
import { ensureSidebarItemVisible, ensureSidebarToggleInActive } from '../support/utils';
import { GatewayServicesPage } from '../selectors/Gateway-Services-page';
import { Layout } from '../selectors/common/layout';

devices.forEach(device => {
    describe(`Gateway Service E2E Test on ${device.name}`, () => {

        beforeEach(() => {
            cy.visit(Cypress.env('KONG_BASE_URL') + `/default/overview`);
            cy.viewport(device.viewport.width, device.viewport.height);
        });

        afterEach(() => {
            cy.cleanUpRoutesAndServices();
        })

        it('should create a gateway service and verify via UI and Admin API', () => {
            cy.fixture('service_info.json').then((serviceData) => {
                ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
                cy.get(Layout.sidebarItemsOverview).click();
                ensureSidebarToggleInActive(device);
                cy.get(Layout.actionButton).click();

                // verify save button is disables
                cy.get(GatewayServicesPage.submitButton).should('be.disabled');

                // Create a gateway service in UI
                cy.get(GatewayServicesPage.urlInput).type(serviceData.url);
                cy.get(GatewayServicesPage.viewAdvancedFieldsCollapseTrigger).click();
                cy.get(GatewayServicesPage.retryInput).clear().type(serviceData.retries.toString());
                cy.get(GatewayServicesPage.connectTimeoutInput).clear().type(serviceData.connect_timeout.toString());
                cy.get(GatewayServicesPage.writeTimeoutInput).clear().type(serviceData.write_timeout.toString());
                cy.get(GatewayServicesPage.readTimeoutInput).clear().type(serviceData.read_timeout.toString());
                cy.get(GatewayServicesPage.tlsVerifyCheckbox).check();
                cy.get(GatewayServicesPage.nameInput).clear().type(serviceData.name);
                cy.get(GatewayServicesPage.tagsCollapseTrigger).click();
                cy.get(GatewayServicesPage.tagsInput).type(serviceData.tags.join(', '));
                // view configuration
                cy.get(GatewayServicesPage.viewConfigurationButton).click();
                cy.get(GatewayServicesPage.configurationTitle).should('be.visible');
                cy.get(GatewayServicesPage.closeConfigurationButton).click();
                // submit
                cy.get(GatewayServicesPage.submitButton).click();

                // verify service details in UI
                cy.get(GatewayServicesPage.title).should('have.text', serviceData.name).should('be.visible');
                cy.get(GatewayServicesPage.serviceNameInTable).should('have.text', serviceData.name);
                cy.get(GatewayServicesPage.serviceHostInTable).should('have.text', serviceData.host);
                cy.get(GatewayServicesPage.serviceProtocolInTable).should('have.text', serviceData.protocol);

                // verify service details via admin API
                cy.request({
                    method: 'GET',
                    url: Cypress.env('KONG_ADMIN_URL') + `/default/services/` + serviceData.name,
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq(serviceData.name);
                    expect(response.body.host).to.eq(serviceData.host);
                    expect(response.body.protocol).to.eq(serviceData.protocol);
                });
            });
        });

        it('should display error message when creating service with invalid URL', () => {
            ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
            cy.get(Layout.sidebarItemsOverview).click();
            ensureSidebarToggleInActive(device);
            cy.get(Layout.actionButton).click();

            // verify save button is disables
            cy.get(GatewayServicesPage.submitButton).should('be.disabled');
            // input invalid URL
            cy.get(GatewayServicesPage.urlInput).clear().type('invalid_url');
            cy.get(GatewayServicesPage.urlInput).should('have.attr', 'aria-invalid', 'true');
            // TODO: verify error message is displayed in page - hard to locate the error message

            // verify save button is disables
            cy.get(GatewayServicesPage.submitButton).should('be.disabled');
        })

    });
});
