## Action Plan to optimize the test suite

### support multiple devices to test against responsive design - DONE

### clean up test env before tests - DONE

### use centralized selectors - DONE
- Create selectors files in `cypress/selectors` for each page, such as `GatewaySelectors.js` for Gateway Service page

### make test cases are isolated - IN PROGRESS
- each test case should be independent, not share any data or state with other test cases

### add more check points especially negative cases - IN PROGRESS
- create service with empty name, create service with invalid url, etc.
- delete service with non-empty routes, delete service with non-empty plugins, etc.

### use data-driven testing (parameterization) - DONE
- Create json files in `fixtures` to store the test data, such as `service-info.json` for service creation
- Parameterize the test cases using the json files

### test against multiple environments (QA, STG, PROD) - TBD
- Use environment variables to store the test data, such as `QA`, `STG`, `PROD`

### test with different roles (admin, user, guest) - TBD
- Create different roles in the test environment, such as `admin`, `user`, `guest`

### test with different browsers (Chrome, Edge, Firefox, Safari, etc) - TBD

### trouble shooting
- in tablet mode, the test cases are not stable with navigation bar item operation
root cause: sidebar overlay is not hidden when click on the navigation bar item in tablet mode in Cypress - randomly happen, not consistent
workaround: check the toggle status should be `not.active` before click on the navigation bar item, and then we can move ahead



