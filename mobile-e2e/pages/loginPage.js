const BasePage = require('./basePage');

class LoginPage extends BasePage {
    get emailInput() { return $('//android.widget.EditText[contains(@text, "Email")]'); }
    get passwordInput() { return $('//android.widget.EditText[contains(@text, "Password")]'); }
    get loginButton() { return $('~Sign In'); }
    get errorMessage() { return $('//android.widget.TextView[@content-desc="error-message"]'); }
    get emailValidation() { return $('//android.widget.TextView[contains(@text, "valid email")]'); }

    async login(email, password) {
        if (email) await this.setValue(await this.emailInput, email, 'Email Input');
        if (password) await this.setValue(await this.passwordInput, password, 'Password Input');
        await this.click(await this.loginButton, 'Login Button');
    }

    async getErrorMessage() {
        return await this.getText(await this.errorMessage, 'Error Message');
    }
}

module.exports = new LoginPage();
