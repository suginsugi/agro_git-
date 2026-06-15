class Gestures {
    
    async tap(element) {
        await element.waitForDisplayed();
        await element.click();
    }

    async swipeUp(percentage = 0.5) {
        const size = await driver.getWindowRect();
        const startY = size.height * 0.8;
        const endY = size.height * (0.8 - percentage);
        const x = size.width / 2;

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 1000, x, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }

    async swipeDown(percentage = 0.5) {
        const size = await driver.getWindowRect();
        const startY = size.height * 0.2;
        const endY = size.height * (0.2 + percentage);
        const x = size.width / 2;

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 1000, x, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }

    async scrollUntilVisible(element, maxSwipes = 5) {
        for (let i = 0; i < maxSwipes; i++) {
            if (await element.isDisplayed()) {
                return true;
            }
            await this.swipeUp(0.3);
        }
        throw new Error(`Element not visible after ${maxSwipes} swipes`);
    }

    async longPress(element, durationMs = 2000) {
        await element.waitForDisplayed();
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const x = location.x + (size.width / 2);
        const y = location.y + (size.height / 2);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: durationMs },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }
}

module.exports = new Gestures();
