const dynamicFormValidator = require('../utilities/DynamicFormValidator');
const driverWrapper = require('../utilities/DriverWrapper');
const config = require('../config/selenium.config');

describe('Dynamic Form Validations', function () {
  
  // List of routes to scan for forms
  const routesToTest = [
    '/contact',
    '/profile',
    '/settings'
  ];

  routesToTest.forEach(route => {
    it(`should dynamically discover and validate forms on ${route}`, async function () {
      await driverWrapper.navigate(`${config.baseUrl}${route}`);
      // Wait for React to mount and render forms
      await driverWrapper.driver.sleep(2000); 
      await dynamicFormValidator.validateFormsOnPage();
    });
  });

});
