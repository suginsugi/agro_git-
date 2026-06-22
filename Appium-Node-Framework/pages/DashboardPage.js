const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(driver) {
    super(driver);
    
    // Locators
    this.welcomeText = '~welcome-header';
    this.profileTab = '~tab-profile';
    this.scanTab = '~tab-scan';
    this.logoutBtn = '~logout-button';
  }

  async isAt() {
    return await this.isDisplayed(this.welcomeText);
  }

  async getWelcomeMessage() {
    return await this.getText(this.welcomeText);
  }

  async navigateToProfile() {
    await this.gestures.tap(this.profileTab);
  }

  async navigateToScan() {
    await this.gestures.tap(this.scanTab);
  }

  async logout() {
    await this.gestures.scrollUntilVisible(this.logoutBtn);
    await this.gestures.tap(this.logoutBtn);
  }
}

module.exports = DashboardPage;
