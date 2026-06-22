const driverFactory = require('../drivers/DriverFactory');
const logger = require('../utilities/Logger');

class BaseTest {
  constructor() {
    this.driver = null;
  }

  async setup() {
    logger.info('Executing Before Hook: Setting up Appium driver...');
    this.driver = await driverFactory.initDriver();
  }

  async teardown() {
    logger.info('Executing After Hook: Quitting Appium driver...');
    await driverFactory.quitDriver();
  }

  getDriver() {
    return this.driver;
  }
}

module.exports = new BaseTest();
