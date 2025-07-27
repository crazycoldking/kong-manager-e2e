## Action Plan to optimize the test suite

### 1 use central selectors 
- Create a `selectors.js` file to store all the central selectors
- Use the central selectors in all the test files

Advantage:
- Reduce code duplication
- Make the test suite more maintainable
- Easy to update the selectors when the UI changes

### 2 use custom commands
- Create a `commands.js` file to store all the custom commands
- Import the `commands.js` file in all the test files
- Use the custom commands in all the test files

Advantage:
- Reduce code duplication
- Make the test suite more maintainable
- Easy to update the commands when the UI changes

### 3 use data-driven testing
- Create json files in `fixtures` to store the test data, such as `service-info.json` for service creation
- Parameterize the test cases using the json files

