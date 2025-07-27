# Kong Manager E2E UI Test Suite

This repository contains end-to-end UI test suites for Kong Manager, built with Cypress for automated browser testing.
Current test cases:
- Create a service and verify the service is created successfully
- Create a route and verify the route is created successfully

Will add more test cases in the future.

## Prerequisites
- Node.js 14.x or later
- npm 6.x or later
- A running instance of Kong Manager
- Git


## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/crazycoldking/kong-manager-e2e.git
   
   cd kong-manager-e2e
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
Create a `.env` file in the root directory with the following variables:
```
KONG_BASE_URL=http://localhost:8002
ADMIN_USER=YOUR_ADMIN_USER
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
```

## Kong Manager Test Environment setup
- Download the [docker-compose file](https://drive.google.com/file/d/1ZqYLsFhcBAseFofEV8YCcOt4vZnItiBi/view?usp=sharing)
- Navigate to the directory where the docker-compose.yml file is located
- Run `docker-compose up -d`
- Navigate to http://localhost:8002/ in your browser
- Make sure you can access the Kong Gateway UI (Kong Manager)
- The default workspace is `default`

## Running Tests

### Interactive Mode
Run tests with Cypress Test Runner for debugging and development:
```bash
npm run cypress:open
```

### Headless Mode
Run tests in headless mode for CI/CD integration:
```bash
npm run test
```

### Run Specific Test Files 

```bash
npx cypress run --spec "cypress/e2e/specific-test.cy.js"
```

### Run Specific Test Files with environment variables

```bash
npx cypress run --spec "cypress/e2e/specific-test.cy.js" --env-file .env.staging
```


## Test Structure
- `cypress/e2e/`: Contains test files organized by feature
- `cypress/fixtures/`: Test data and payloads
- `cypress/support/`: Custom commands and test utilities
- `cypress.config.js`: Cypress configuration

## Reporting
Test results are generated using Mochawesome reporter. Reports are available in the `reports/` directory after test execution.

Screenshots and videos of test failures are automatically saved to `cypress/screenshots/` and `cypress/videos/` directories.

## CI/CD Integration

This project uses GitHub Actions for continuous integration. The workflow file is located at `.github/workflows/main.yml` and includes the following steps:

1. Checkout code
2. Set up Node.js environment
3. Install dependencies
4. Start Docker test environment
5. Run Cypress E2E tests
6. Clean up resources
7. Upload test artifacts on failure


### Required GitHub Secrets
To run the CI workflow, you need to configure these secrets in your GitHub repository:
- `ADMIN_USER`: Valid admin username
- `ADMIN_PASSWORD`: Valid admin password
- `INVALID_USER`: Invalid test username
- `INVALID_PASSWORD`: Invalid test password

### Manual Trigger
You can manually trigger the workflow from the Actions tab in your GitHub repository or it will automatically run on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches
This test suite is configured to run in GitHub Actions. See .github/workflows/ci.yml for configuration details.

## Troubleshooting
- **Kong Manager not accessible**: Ensure Kong is running and KONG_BASE_URL is correctly configured
- **Test failures**: Check screenshots/videos in the cypress directory for visual evidence
- **Dependency issues**: Try removing `node_modules` and reinstalling with `npm install`

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-test`)
3. Commit your changes (`git commit -m 'Add some amazing test'`)
4. Push to the branch (`git push origin feature/amazing-test`)
5. Open a Pull Request
