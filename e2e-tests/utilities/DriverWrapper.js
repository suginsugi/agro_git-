const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const fs = require('fs');
const path = require('path');
const config = require('../config/selenium.config.js');
const logger = require('./Logger');

class DriverWrapper {
  constructor() {
    this.driver = null;
  }

  async initDriver() {
    let builder = new Builder().forBrowser(config.browser);

    if (config.headless) {
      if (config.browser === 'chrome') {
        const options = new chrome.Options();
        options.addArguments('--headless', '--disable-gpu', '--window-size=1920,1080', '--no-sandbox', '--disable-dev-shm-usage');
        builder = builder.setChromeOptions(options);
      } else if (config.browser === 'firefox') {
        const options = new firefox.Options();
        options.addArguments('--headless');
        builder = builder.setFirefoxOptions(options);
      } else if (config.browser === 'edge') {
        const options = new edge.Options();
        options.addArguments('--headless', '--disable-gpu', '--window-size=1920,1080');
        builder = builder.setEdgeOptions(options);
      }
    }

    this.driver = await builder.build();
    await this.driver.manage().setTimeouts({
      implicit: config.timeouts.implicit,
      pageLoad: config.timeouts.pageLoad,
      script: config.timeouts.script
    });
    
    if (!config.headless) {
      await this.driver.manage().window().maximize();
    }
    
    return this.driver;
  }

  async getDriver() {
    if (!this.driver) {
      await this.initDriver();
    }
    return this.driver;
  }

  async quitDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  async navigate(url) {
    logger.info(`Navigating to ${url}`);
    await this.driver.get(url);
  }

  async findElement(locator, timeout = config.timeouts.explicit) {
    try {
      const element = await this.driver.wait(until.elementLocated(locator), timeout);
      return await this.driver.wait(until.elementIsVisible(element), timeout);
    } catch (error) {
      logger.error(`Element not found: ${locator.toString()} - ${error.message}`);
      throw error;
    }
  }

  async findElements(locator, timeout = config.timeouts.explicit) {
    try {
      return await this.driver.wait(until.elementsLocated(locator), timeout);
    } catch (error) {
      logger.error(`Elements not found: ${locator.toString()} - ${error.message}`);
      throw error;
    }
  }

  async click(locator) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsEnabled(element), config.timeouts.explicit);
    logger.info(`Clicking element: ${locator.toString()}`);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.findElement(locator);
    logger.info(`Typing "${text}" into element: ${locator.toString()}`);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.findElement(locator);
    return await element.getText();
  }

  async executeScript(script, ...args) {
    return await this.driver.executeScript(script, ...args);
  }

  async scrollToElement(locator) {
    const element = await this.findElement(locator);
    await this.executeScript("arguments[0].scrollIntoView(true);", element);
  }

  async takeScreenshot(testName) {
    const screenshot = await this.driver.takeScreenshot();
    const fileName = `${testName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.png`;
    const filePath = path.join(__dirname, '..', config.reports.screenshotsDir, fileName);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, screenshot, 'base64');
    logger.info(`Screenshot saved to ${filePath}`);
    return filePath;
  }

  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }
}

module.exports = new DriverWrapper();
