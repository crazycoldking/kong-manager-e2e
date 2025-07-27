export const selectors = {
  workspacesPage: {
    // header
    logo: 'img[alt="Kong Manager Logo"]',
    docsSupport: 'a[class="trigger"]',
    infoIcon: 'span[class="kui-icon info-icon"]',
    widget: 'div[class="widget"]',
    // nav
    workspaceIcon: 'div[class="sidebar-item-icon kui-icon overview-icon"]',
    // //*[@id="app"]/aside/div[2]/nav/ul/li[1]/a/div/div[2]/div
    workspacesText: 'div[class="sidebar-item-icon kui-icon overview-icon"]::siblings[data-testid="sidebar-item-workspaces"] > .sidebar-item-link > .sidebar-item-display',


    heading: 'h1',
    usernameInput: 'input[name=username]',
    passwordInput: 'input[name=password]',
    submitButton: 'button[type=submit]',
    errorMessage: '.error-message',
    successMessage: '.success-message'
  },
  dashboardPage: {
    heading: 'h1',
    addServiceButton: 'button[href="/services/add"]',
    serviceList: '.service-list',
    serviceName: '.service-name',
    serviceUrl: '.service-url',
    serviceProtocol: '.service-protocol',
    serviceRoutes: '.service-routes',
    serviceRoutesName: '.service-routes-name',
    serviceRoutesPath: '.service-routes-path',
    serviceRoutesMethods: '.service-routes-methods',
    serviceRoutesStripPath: '.service-routes-strip-path',
    serviceRoutesPreserveHost: '.service-routes-preserve-host',
    serviceRoutesUpstreamHost: '.service-routes-upstream-host',
    serviceRoutesUpstreamPort: '.service-routes-upstream-port',
  },
  serviceAddPage: {
    heading: 'h1',
    nameInput: 'input[name=name]',
    urlInput: 'input[name=url]',
    protocolInput: 'select[name=protocol]',
    routesNameInput: 'input[name=routes.name]',
    routesPathInput: 'input[name=routes.path]',
    routesMethodsInput: 'select[name=routes.methods]',
    routesStripPathInput: 'input[name=routes.strip_path]',
    routesPreserveHostInput: 'input[name=routes.preserve_host]',
    routesUpstreamHostInput: 'input[name=routes.upstream_host]',
    routesUpstreamPortInput: 'input[name=routes.upstream_port]',
  },
  serviceEditPage: {
    heading: 'h1',
    nameInput: 'input[name=name]',
    urlInput: 'input[name=url]',
    protocolInput: 'select[name=protocol]',
    routesNameInput: 'input[name=routes.name]',
    routesPathInput: 'input[name=routes.path]',
    routesMethodsInput: 'select[name=routes.methods]',
    routesStripPathInput: 'input[name=routes.strip_path]',
    routesPreserveHostInput: 'input[name=routes.preserve_host]',
    routesUpstreamHostInput: 'input[name=routes.upstream_host]',
    routesUpstreamPortInput: 'input[name=routes.upstream_port]',
  },
  serviceDeletePage: {
    heading: 'h1',
    confirmButton: 'button[type=submit]',
  },
  serviceRoutesEditPage: {
    heading: 'h1',
    nameInput: 'input[name=routes.name]',
    pathInput: 'input[name=routes.path]',
    methodsInput: 'select[name=routes.methods]',
    stripPathInput: 'input[name=routes.strip_path]',
    preserveHostInput: 'input[name=routes.preserve_host]',
    upstreamHostInput: 'input[name=routes.upstream_host]',
    upstreamPortInput: 'input[name=routes.upstream_port]',
  }   
};