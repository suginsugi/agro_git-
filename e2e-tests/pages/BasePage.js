const driverWrapper = require('../utilities/DriverWrapper');
const config = require('../config/selenium.config');
const logger = require('../utilities/Logger');

class BasePage {
  constructor() {
    this.driverWrapper = driverWrapper;
    this.baseUrl = config.baseUrl;
  }

  async navigateTo(path = '') {
    const url = `${this.baseUrl}${path}`;
    logger.info(`Navigating to page: ${url}`);
    await this.driverWrapper.navigate(url);
  }

  async getTitle() {
    const driver = await this.driverWrapper.getDriver();
    return await driver.getTitle();
  }

  async getCurrentUrl() {
    return await this.driverWrapper.getCurrentUrl();
  }
  
  async takeScreenshot(testName) {
    return await this.driverWrapper.takeScreenshot(testName);
  }
}

module.exports = BasePage;
