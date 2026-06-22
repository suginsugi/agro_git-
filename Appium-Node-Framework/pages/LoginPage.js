const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    
    // Locators
    this.usernameInput = '~username-input';
    this.passwordInput = '~password-input';
    this.loginBtn = '~login-button';
    this.errorMessage = '~error-message-text';
  }

  async enterCredentials(username, password) {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
    await this.hideKeyboard();
  }

  async clickLogin() {
    await this.gestures.tap(this.loginBtn);
  }

  async loginAs(username, password) {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isAt() {
    return await this.isDisplayed(this.loginBtn);
  }
}

module.exports = LoginPage;
