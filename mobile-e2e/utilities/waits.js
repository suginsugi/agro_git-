const logger = require('./logger');

class Waits {
    async waitForDisplayed(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (error) {
            logger.error(`Element not displayed within ${timeout}ms`);
            return false;
        }
    }

    async waitForClickable(element, timeout = 10000) {
        try {
            await element.waitForClickable({ timeout });
            return true;
        } catch (error) {
            logger.error(`Element not clickable within ${timeout}ms`);
            return false;
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new Waits();
