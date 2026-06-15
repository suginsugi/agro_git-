const { expect } = require('chai');
const loginPage = require('../pages/loginPage');
const dashboardPage = require('../pages/dashboardPage');

describe('Authentication Testing', () => {

    it('should validate empty username and password', async () => {
        await loginPage.login('', '');
        const isEmailInvalid = await loginPage.isDisplayed(await loginPage.emailValidation);
        expect(isEmailInvalid).to.be.true;
    });

    it('should show error for invalid credentials', async () => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        const isErrorDisplayed = await loginPage.isDisplayed(await loginPage.errorMessage);
        expect(isErrorDisplayed).to.be.true;
    });

    it('should successfully login with valid credentials', async () => {
        await loginPage.login('farmer@agrovision.com', 'SecurePass123!');
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

});
