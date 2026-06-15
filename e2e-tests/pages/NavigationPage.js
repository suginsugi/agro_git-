const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class NavigationPage extends BasePage {
  
  // Locators
  get navbar() { return By.css('nav'); }
  get dashboardLink() { return By.xpath("//a[contains(text(), 'Dashboard') or contains(@href, '/dashboard')]"); }
  get contactLink() { return By.xpath("//a[contains(text(), 'Contact') or contains(@href, '/contact')]"); }
  get profileLink() { return By.xpath("//a[contains(text(), 'Profile') or contains(@href, '/profile')]"); }

  async navigateToDashboard() {
    await this.driverWrapper.click(this.dashboardLink);
  }

  async navigateToContact() {
    await this.driverWrapper.click(this.contactLink);
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
