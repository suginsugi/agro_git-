const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class ContactPage extends BasePage {
  
  constructor() {
    super();
    this.path = '/contact';
  }

  // Locators
  get fullNameInput() { return By.id('contact-fullName'); }
  get emailInput() { return By.id('contact-email'); }
  get mobileInput() { return By.id('contact-mobile'); }
  get subjectInput() { return By.id('contact-subject'); }
  get messageInput() { return By.id('contact-message'); }
  get submitBtn() { return By.css('button[type="submit"]'); }
  get clearBtn() { return By.xpath("//button[contains(text(), 'Clear Form')]"); }

  async open() {
    await this.navigateTo(this.path);
  }

  async fillForm(name, email, mobile, subject, message) {
    if (name !== null) await this.driverWrapper.type(this.fullNameInput, name);
    if (email !== null) await this.driverWrapper.type(this.emailInput, email);
    if (mobile !== null) await this.driverWrapper.type(this.mobileInput, mobile);
    if (subject !== null) await this.driverWrapper.type(this.subjectInput, subject);
    if (message !== null) await this.driverWrapper.type(this.messageInput, message);
  }

  async submitForm() {
    await this.driverWrapper.click(this.submitBtn);
  }

  async clearForm() {
    await this.driverWrapper.click(this.clearBtn);
  }
}

module.exports = new ContactPage();
