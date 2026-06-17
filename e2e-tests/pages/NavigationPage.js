const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class NavigationPage extends BasePage {
  
  // Locators
  get navbar() { return By.css('nav'); }
  get dashboardLink() { return By.xpath("//a[contains(text(), 'Dashboard') or contains(@href, '/dashboard')]"); }
  get contactLink() { return By.xpath("//a[contains(text(), 'Contact') or contains(@href, '/contact')]"); }
  get profileLink() { return By.xpath("//a[contains(text(), 'Profile') or contains(@href, '/profile')]"); }

  async navigateToDashboard() {
    const driver = await this.driverWrapper.getDriver();
    // Wait briefly for hydration
    await driver.sleep(1000);
    const element = await this.driverWrapper.findElement(this.dashboardLink);
    await this.driverWrapper.executeScript("arguments[0].click();", element);
  }

  async navigateToContact() {
    const driver = await this.driverWrapper.getDriver();
    await driver.sleep(1000);
    const element = await this.driverWrapper.findElement(this.contactLink);
    await this.driverWrapper.executeScript("arguments[0].click();", element);
  }

  async verifyNavbarPresent() {
    return await this.driverWrapper.findElement(this.navbar);
  }

  async goBack() {
    const driver = await this.driverWrapper.getDriver();
    await driver.navigate().back();
  }

  async goForward() {
    const driver = await this.driverWrapper.getDriver();
    await driver.navigate().forward();
  }

  async refresh() {
    const driver = await this.driverWrapper.getDriver();
    await driver.navigate().refresh();
  }
}

module.exports = new NavigationPage();
