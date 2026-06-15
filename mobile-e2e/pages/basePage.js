const logger = require('../utilities/logger');
const waits = require('../utilities/waits');

class BasePage {
    async click(element, elementName = 'Element') {
        await waits.waitForClickable(element);
        await element.click();
        logger.info(`Clicked on ${elementName}`);
    }

    async setValue(element, value, elementName = 'Element') {
        await waits.waitForDisplayed(element);
        await element.clearValue();
        await element.setValue(value);
        logger.info(`Entered value '${value}' in ${elementName}`);
    }

    async getText(element, elementName = 'Element') {
        await waits.waitForDisplayed(element);
        const text = await element.getText();
        logger.info(`Retrieved text '${text}' from ${elementName}`);
        return text;
    }

    async isDisplayed(element, elementName = 'Element') {
        const displayed = await waits.waitForDisplayed(element, 5000);
        logger.info(`Element ${elementName} is displayed: ${displayed}`);
        return displayed;
    }
}

module.exports = BasePage;
