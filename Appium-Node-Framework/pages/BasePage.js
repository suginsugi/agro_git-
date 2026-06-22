const Gestures = require('../utilities/Gestures');
const Waits = require('../utilities/Waits');
const logger = require('../utilities/Logger');

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.gestures = new Gestures(driver);
    this.waits = new Waits(driver);
  }

  async setValue(locator, value) {
    logger.info(`Setting value '${value}' on element: ${locator}`);
    const element = await this.waits.waitForElement(locator);
    await element.clearValue();
    await element.setValue(value);
  }

  async getText(locator) {
    logger.info(`Getting text from element: ${locator}`);
    const element = await this.waits.waitForElement(locator);
    return await element.getText();
  }

  async isDisplayed(locator) {
    try {
      const element = await this.driver.$(locator);
      return await element.isDisplayed();
    } catch (e) {
      return false;
    }
  }

  async hideKeyboard() {
    try {
      await this.driver.hideKeyboard();
    } catch (e) {
      // Keyboard might already be hidden
    }
  }
}

module.exports = BasePage;
