const { remote } = require('webdriverio');
const config = require('../config/appium.config');
const logger = require('../utilities/Logger');

class DriverFactory {
  constructor() {
    this.driver = null;
  }

  async initDriver() {
    if (this.driver) {
      logger.info('Driver is already initialized.');
      return this.driver;
    }

    try {
      logger.info('Initializing Appium Driver...');
      
      const options = {
        path: config.serverParams.path,
        port: config.serverParams.port,
        hostname: config.serverParams.hostname,
        logLevel: config.serverParams.logLevel,
        capabilities: config.androidCapabilities
      };

      this.driver = await remote(options);
      logger.info('Appium Driver successfully initialized.');
      return this.driver;
    } catch (error) {
      logger.error(`Failed to initialize Appium Driver: ${error.message}`);
      throw error;
    }
  }

  async quitDriver() {
    if (this.driver) {
      logger.info('Quitting Appium Driver...');
      await this.driver.deleteSession();
      this.driver = null;
      logger.info('Appium Driver session closed.');
    }
  }

  getDriver() {
    if (!this.driver) {
      throw new Error("Driver not initialized. Call initDriver() first.");
    }
    return this.driver;
  }
}

// Export as singleton
module.exports = new DriverFactory();
