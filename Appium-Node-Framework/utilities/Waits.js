const logger = require('./Logger');

class Waits {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForElement(locator, timeout = 10000) {
    logger.info(`Waiting for element: ${locator} for up to ${timeout}ms`);
    try {
      const element = await this.driver.$(locator);
      await element.waitForDisplayed({ timeout });
      return element;
    } catch (error) {
      logger.error(`Element ${locator} not displayed after ${timeout}ms`);
      throw error;
    }
  }

  async waitForElementClickable(locator, timeout = 10000) {
    logger.info(`Waiting for element to be clickable: ${locator}`);
    try {
      const element = await this.driver.$(locator);
      await element.waitForClickable({ timeout });
      return element;
    } catch (error) {
      logger.error(`Element ${locator} not clickable after ${timeout}ms`);
      throw error;
    }
  }
}

module.exports = Waits;
