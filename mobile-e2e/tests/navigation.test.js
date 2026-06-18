const { expect } = require('chai');
const loginPage = require('../pages/loginPage');
const dashboardPage = require('../pages/dashboardPage');
const gestures = require('../utilities/gestures');

describe('Tab Navigation Testing', () => {

    before(async () => {
        // Login first to reach the dashboard
        await loginPage.login('farmer@agrovision.com', 'SecurePass123!');
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

    it('should navigate to Market tab and verify content loads', async () => {
        await dashboardPage.navigateTo('market');

        const marketHeader = await $('~Market');
        expect(await marketHeader.isDisplayed()).to.be.true;
    });

    it('should navigate to Scan tab and verify content loads', async () => {
        await dashboardPage.navigateTo('scan');

        const scanHeader = await $('~Scan');
        expect(await scanHeader.isDisplayed()).to.be.true;
    });

    it('should navigate to Assistant tab and verify content loads', async () => {
        await dashboardPage.navigateTo('assistant');

        const assistantHeader = await $('~Assistant');
        expect(await assistantHeader.isDisplayed()).to.be.true;
    });

    it('should navigate to Profile tab and verify content loads', async () => {
        await dashboardPage.navigateTo('profile');

        const profileHeader = await $('~Profile');
        expect(await profileHeader.isDisplayed()).to.be.true;
    });

    it('should navigate back to Home tab from Profile', async () => {
        await dashboardPage.navigateTo('home');
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

    it('should perform full round-trip navigation across all tabs', async () => {
        const tabs = ['market', 'scan', 'assistant', 'profile', 'home'];

        for (const tab of tabs) {
            await dashboardPage.navigateTo(tab);
            // Brief pause to allow tab transition animation
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Verify we ended up back on Home/Dashboard
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

});
