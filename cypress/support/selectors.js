export const selectors = {
  workspacesPage: {
    // header
    logo: 'img[alt="Kong Manager Logo"]',
    docsSupport: 'a[class="trigger"]',
    infoIcon: 'span[class="kui-icon info-icon"]',
    widget: 'div[class="widget"]',
    // nav
    workspaceIcon: 'div[class="sidebar-item-icon kui-icon overview-icon"]',
    workspacesText: 'div[class="sidebar-item-icon kui-icon overview-icon"]::siblings[data-testid="sidebar-item-workspaces"] > .sidebar-item-link > .sidebar-item-display',
    heading: 'h1',
    usernameInput: 'input[name=username]',
    passwordInput: 'input[name=password]',
    submitButton: 'button[type=submit]',
    errorMessage: '.error-message',
    successMessage: '.success-message'
  },
  overviewPage: {
    serviceCount: '[data-testid="Services"] > .metric-value > .metric-value-text',
    routeCount: '[data-testid="Routes"] > .metric-value > .metric-value-text',
    title: 'span.title',
  },
  layout: {
    sidebarItemsOverview: '[data-testid="sidebar-item-overview"]',
    sidebarMenuToggle: '.sidebar-menu-toggle',
    sidebarItemGatewayServices: '[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link',
    sidebarItemRoutes: '[data-testid="sidebar-item-routes"] > .sidebar-item-link',
    emptyStateAction: '[data-testid="empty-state-action"]',
    actionButton: '[data-testid="action-button"]',
    headerActions: '[data-testid="header-actions"]',
    dangerEntityButton: '.danger > [data-testid="entity-button"]',
    confirmationInput: '[data-testid="confirmation-input"]',
    modalActionButton: '[data-testid="modal-action-button"]'
  },
  serviceCreatePage: {
    urlInput: '[data-testid="gateway-service-url-input"]',
    nameInput: '[data-testid="gateway-service-name-input"]',
    viewAdvancedFieldsCollapseTrigger: '[data-testid="advanced-fields-collapse"] > .collapse-heading > .collapse-trigger > [data-testid="collapse-trigger-content"] > [data-testid="collapse-trigger-label"]',
    retryLabel: '.gateway-service-form-advanced-fields > :nth-child(1) > .k-input > .k-label',
    retryInput: '[data-testid="gateway-service-retries-input"]',
    connectTimeoutLabel: '.gateway-service-form-advanced-fields > :nth-child(2) > .k-input > .k-label',
    connectTimeoutInput: '[data-testid="gateway-service-connTimeout-input"]',
    writeTimeoutLabel: '.gateway-service-form-advanced-fields > :nth-child(3) > .k-input > .k-label',
    writeTimeoutInput: '[data-testid="gateway-service-writeTimeout-input"]',
    readTimeoutLabel: '.gateway-service-form-advanced-fields > :nth-child(4) > .k-input > .k-label',
    readTimeoutInput: '[data-testid="gateway-service-connTimeout-input"]',
    readTimeoutLabel: '.gateway-service-form-advanced-fields > :nth-child(6) > .k-input > .k-label',
    clientCertificateLabel: ':nth-child(5) > .k-input > .k-label',
    clientCertificateInput: '[data-testid="gateway-service-clientCert-input"]',
    caCertificatesLabel: ':nth-child(6) > .k-input > .k-label',
    caCertificatesInput: '[data-testid="gateway-service-ca-certs-input"]',
    tlsVerifyLabel: '.checkbox-label-wrapper > .k-label',
    tlsVerifyCheckbox: '[data-testid="gateway-service-tls-verify-checkbox"]',
    tagsCollapseTrigger: '[data-testid="tags-collapse"] [data-testid="collapse-trigger-content"]',
    tagsInput: '[data-testid="gateway-service-tags-input"]',
    submitButton: '[data-testid="service-create-form-submit"]',
    title: '.title',
    viewConfigurationButton: '[data-testid="service-create-form-view-configuration"]',
    configurationTitle: '[data-testid="slideout-title"]',
    closeConfigurationButton: '[data-testid="slideout-close-icon"]'
  },
  gatewayServicesPage: {
    title: '.title',
    serviceNameLink: '[data-testid="test-service"] > [data-testid="name"] b',
    protocol: '[data-testid="protocol"] > .cell-wrapper > .content-wrapper',
    host: '[data-testid="host"] > .cell-wrapper > .content-wrapper',
    port: '[data-testid="port"] > .cell-wrapper > .content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper',
    addARouteButton: '.alert-message > .k-button'
  },
  routeCreatePage: {
    nameInput: '[data-testid="route-form-name"]',
    serviceSelect: '[data-testid="route-form-service-id"]',
    serviceSelectItem: '.select-item-description',
    basicRadioButton: '[data-testid="route-form-config-type-basic"]',
    advancedRadioButton: '[data-testid="route-form-config-type-advanced"]',
    tagsInput: '[data-testid="route-form-tags"]',
    pathsInput: '[data-testid="route-form-paths-input-1"]',
    hostsInput: '[data-testid="route-form-hosts-input-1"]',
    methodsMultiselect: '.multiselect-icons-container',
    getMethodItem: '[data-testid="multiselect-item-GET"] > .multiselect-item-container > button > .multiselect-item-label',
    submitButton: '[data-testid="route-create-form-submit"]'
  },
  routeDetailPage: {
    title: '.title',
    name: '[data-testid="name"] > .cell-wrapper > .content-wrapper > b',
    service: '[data-testid="service"] > .cell-wrapper > .content-wrapper > b',
    protocol: '[data-testid="protocol"] > .cell-wrapper > .content-wrapper',
    hosts: '[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper'
  },
  routeListPage: {
    routeName: 'b',
    hosts: '[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper'
  }
};