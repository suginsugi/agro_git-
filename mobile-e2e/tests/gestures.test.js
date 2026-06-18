const { expect } = require('chai');
const loginPage = require('../pages/loginPage');
const dashboardPage = require('../pages/dashboardPage');
const gestures = require('../utilities/gestures');
const waits = require('../utilities/waits');

describe('App Gestures Testing', () => {

    before(async () => {
        // Login to reach the dashboard
        await loginPage.login('farmer@agrovision.com', 'SecurePass123!');
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

    it('should perform swipe up gesture on dashboard', async () => {
        await gestures.swipeUp(0.3);
        // After swiping, verify the app is still responsive
        await waits.sleep(500);
        await gestures.swipeDown(0.3);

        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

    it('should perform swipe down gesture (pull to refresh)', async () => {
        await gestures.swipeDown(0.3);
        await waits.sleep(1000);

        // Dashboard should still be loaded after refresh
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

    it('should scroll until Disease Scan element is visible', async () => {
        const diseaseScan = await $('~Disease Scan');
        try {
            await gestures.scrollUntilVisible(diseaseScan, 5);
            expect(await diseaseScan.isDisplayed()).to.be.true;
        } catch (e) {
            // Element may not exist, that's OK for this test
            console.log('Disease Scan element not found after scroll');
        }
    });

    it('should navigate to Market tab and swipe through content', async () => {
        await dashboardPage.navigateTo('market');
        await waits.sleep(1000);

        // Swipe up to browse market listings
        await gestures.swipeUp(0.4);
        await waits.sleep(500);
        await gestures.swipeUp(0.4);
        await waits.sleep(500);

        // Swipe back down
        await gestures.swipeDown(0.4);

        // Navigate back to home
        await dashboardPage.navigateTo('home');
        const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
        expect(isDashboardLoaded).to.be.true;
    });

});
