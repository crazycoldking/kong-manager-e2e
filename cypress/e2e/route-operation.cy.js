import { devices } from '../support/devices';
import { ensureSidebarItemVisible, ensureSidebarToggleInActive } from '../support/utils';
import { GatewayServicesPage } from '../selectors/Gateway-Services-page';
import { RoutesPage } from '../selectors/Routes-page';
import { Layout } from '../selectors/common/layout';


devices.forEach(device => {
    describe(`Gateway Service E2E Test on ${device.name}`, () => {

        // TODO: service name and route name should be generated automatically with pattern to avoid conflict
        
        // service name and url should be fetched from fixture file : service_info.json
        before(() => {
            cy.cleanUpRoutesAndServices();
            // Load fixture inside the before hook
            cy.fixture('service_info.json').then((serviceData) => {
                // create a service via admin api
                cy.createService(serviceData.name, serviceData.url);
            });
        });

        after(() => {
            cy.cleanUpRoutesAndServices();
        })

        beforeEach(() => {
            cy.visit(Cypress.env('KONG_BASE_URL') + `/default/overview`);
            cy.viewport(device.viewport.width, device.viewport.height);
        })

        it('should create a route for the service', () => {
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

                // Common route creation steps using metadata from json
                cy.get(RoutesPage.nameInput).type(routeData.name);
                cy.get(RoutesPage.tagsInput).type(routeData.tags.join(', '));
                cy.get(RoutesPage.pathsInput).type(routeData.paths[0]);
                cy.get(RoutesPage.hostsInput).type(routeData.hosts[0]);
                cy.get(RoutesPage.methodsMultiselect).click();
                cy.get(RoutesPage.getMethodItem).click();
                cy.get(Layout.body).click();
                cy.get(RoutesPage.submitButton).click();

                // verify route is created in UI
                ensureSidebarItemVisible(Layout.sidebarItemsOverview, device);
                cy.get(Layout.sidebarItemRoutes).click();
                ensureSidebarToggleInActive(device);
                cy.get(RoutesPage.routeName).should('have.text', routeData.name);
                cy.get(RoutesPage.hosts).should('have.text', routeData.hosts[0]);
                cy.get(RoutesPage.tags).should('have.text', routeData.tags.join(', '));
                cy.get(RoutesPage.routeName).click();
                cy.get(RoutesPage.title).should('have.text', routeData.name);

                // verify route is created via admin api
                cy.request({
                    method: 'GET',
                    url: `${Cypress.env('KONG_ADMIN_URL')}/default/routes/${routeData.name}`,
                    auth: {
                        type: 'basic',
                        username: 'admin',
                        password: 'admin',
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq(routeData.name);
                    expect(response.body.hosts[0]).to.eq(routeData.hosts[0]);
                    expect(response.body.tags).to.deep.eq(routeData.tags);
                    expect(response.body.paths[0]).to.eq(routeData.paths[0]);
                });

            });
        })


    });
});
