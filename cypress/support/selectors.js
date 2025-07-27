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
  layout: {
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
    tagsCollapseTrigger: '[data-testid="tags-collapse"] [data-testid="collapse-trigger-content"]',
    tagsInput: '[data-testid="gateway-service-tags-input"]',
    submitButton: '[data-testid="service-create-form-submit"]',
    title: '.title'
  },
  serviceListPage: {
    serviceNameLink: '[data-testid="test-service"] > [data-testid="name"] b',
    protocol: '[data-testid="protocol"] > .cell-wrapper > .content-wrapper',
    host: '[data-testid="host"] > .cell-wrapper > .content-wrapper',
    port: '[data-testid="port"] > .cell-wrapper > .content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper'
  },
  routeCreatePage: {
    nameInput: '[data-testid="route-form-name"]',
    tagsInput: '[data-testid="route-form-tags"]',
    pathsInput: '[data-testid="route-form-paths-input-1"]',
    hostsInput: '[data-testid="route-form-hosts-input-1"]',
    methodsMultiselect: '.multiselect-icons-container',
    getMethodItem: '[data-testid="multiselect-item-GET"] > .multiselect-item-container > button > .multiselect-item-label',
    submitButton: '[data-testid="route-create-form-submit"]'
  },
  routeListPage: {
    routeName: 'b',
    hosts: '[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper'
  }
};