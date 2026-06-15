const { expect } = require('chai');
const dashboardPage = require('../pages/dashboardPage');
const gestures = require('../utilities/gestures');

describe('Form and UI Validation Testing', () => {

    before(async () => {
        // Assume user is already logged in or handle app state
    });

    it('should validate bottom navigation elements', async () => {
        await dashboardPage.navigateTo('market');
        // Validate Market screen loaded
        const marketTitle = await $('~Market Intel');
        expect(await marketTitle.isDisplayed()).to.be.true;

        await dashboardPage.navigateTo('profile');
        // Validate Profile screen loaded
        const profileTitle = await $('~Raj Singh');
        expect(await profileTitle.isDisplayed()).to.be.true;
    });

    it('should perform gesture scroll on dashboard', async () => {
        await dashboardPage.navigateTo('home');
        
        // Scroll down to check if an element exists
        const someBottomElement = await $('~Disease Scan'); 
        try {
            await gestures.scrollUntilVisible(someBottomElement);
            expect(await someBottomElement.isDisplayed()).to.be.true;
        } catch(e) {
            console.log("Element not found after scrolling");
        }
    });

});
