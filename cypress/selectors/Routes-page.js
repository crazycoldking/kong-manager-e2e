export const RoutesPage = {
    // route create
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
    submitButton: '[data-testid="route-create-form-submit"]',
    // route list
    title: '.title',
    name: '[data-testid="name"] > .cell-wrapper > .content-wrapper > b',
    service: '[data-testid="service"] > .cell-wrapper > .content-wrapper > b',
    protocol: '[data-testid="protocol"] > .cell-wrapper > .content-wrapper',
    hosts: '[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    // route detail
    routeName: 'b',
    hosts: '[data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper',
    tags: '[data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate > .truncate-container > .k-badge > .badge-content > .badge-content-wrapper'
}