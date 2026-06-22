const logger = require('./Logger');

class Gestures {
  constructor(driver) {
    this.driver = driver;
  }

  async tap(locator) {
    logger.info(`Tapping on element: ${locator}`);
    const element = await this.driver.$(locator);
    await element.click();
  }

  async doubleTap(locator) {
    logger.info(`Double tapping on element: ${locator}`);
    const element = await this.driver.$(locator);
    await this.driver.execute('mobile: doubleClickGesture', {
      elementId: element.elementId
    });
  }

  async longPress(locator, durationMs = 1000) {
    logger.info(`Long pressing on element: ${locator}`);
    const element = await this.driver.$(locator);
    await this.driver.execute('mobile: longClickGesture', {
      elementId: element.elementId,
      duration: durationMs
    });
  }

  async swipe(direction, percent = 0.5) {
    logger.info(`Swiping ${direction}`);
    const { width, height } = await this.driver.getWindowRect();
    
    let startX = width / 2;
    let startY = height / 2;
    let endX = width / 2;
    let endY = height / 2;

    const offset = direction === 'up' || direction === 'down' ? height * percent : width * percent;

    switch (direction) {
      case 'up': endY = startY - offset; break;
      case 'down': endY = startY + offset; break;
      case 'left': endX = startX - offset; break;
      case 'right': endX = startX + offset; break;
    }

    await this.driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pointerMove', duration: 1000, x: endX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);
  }

  async scrollUntilVisible(locator, maxSwipes = 5) {
    logger.info(`Scrolling until element ${locator} is visible`);
    let isVisible = false;
    let count = 0;

    while (!isVisible && count < maxSwipes) {
      try {
        const element = await this.driver.$(locator);
        isVisible = await element.isDisplayed();
      } catch (e) {
        isVisible = false;
      }
      if (!isVisible) {
        await this.swipe('up', 0.5);
        count++;
      }
    }
    
    if (!isVisible) {
      throw new Error(`Element ${locator} not found after ${maxSwipes} scrolls`);
    }
  }
}

module.exports = Gestures;
