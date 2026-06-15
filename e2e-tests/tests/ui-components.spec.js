const { expect } = require('chai');
const driverWrapper = require('../utilities/DriverWrapper');
const config = require('../config/selenium.config');
const { By } = require('selenium-webdriver');

describe('UI Components Validation', function () {
  
  before(async function() {
    await driverWrapper.navigate(config.baseUrl);
  });

  it('should verify global header elements', async function () {
    const header = await driverWrapper.findElements(By.css('header'));
    expect(header.length).to.be.greaterThan(0);
    
    // Check for logo
    const logo = await driverWrapper.findElements(By.xpath("//*[contains(text(), 'AgroVision')]"));
    expect(logo.length).to.be.greaterThan(0);
  });

  it('should verify global footer elements', async function () {
    // Scroll to bottom
    await driverWrapper.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    const footer = await driverWrapper.findElements(By.css('footer'));
    expect(footer.length).to.be.greaterThan(0);
  });

});
