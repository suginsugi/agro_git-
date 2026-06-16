const { expect } = require('chai');
const navigationPage = require('../pages/NavigationPage');
const driverWrapper = require('../utilities/DriverWrapper');
const { until } = require('selenium-webdriver');

describe('Navigation Tests', function () {
  
  it('should load the home page successfully', async function () {
    await navigationPage.navigateTo('');
    const title = await navigationPage.getTitle();
    expect(title).to.not.be.empty;
  });

  it('should navigate to dashboard and verify URL', async function () {
    await navigationPage.navigateTo('');
    const navbar = await navigationPage.verifyNavbarPresent();
    expect(navbar).to.exist;
    
    await navigationPage.navigateToDashboard();
    // Wait for client-side navigation to complete
    const driver = await driverWrapper.getDriver();
    await driver.wait(until.urlContains('/dashboard'), 10000);
    const url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/dashboard');
  });

  it('should handle browser back and forward correctly', async function () {
    await navigationPage.navigateTo('');
    await navigationPage.navigateToContact();
    // Wait for client-side navigation to /contact
    const driver = await driverWrapper.getDriver();
    await driver.wait(until.urlContains('/contact'), 10000);
    let url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/contact');

    await navigationPage.goBack();
    // Wait for URL to change away from /contact
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return !currentUrl.includes('/contact');
    }, 10000);
    url = await navigationPage.getCurrentUrl();
    expect(url).to.not.include('/contact');

    await navigationPage.goForward();
    await driver.wait(until.urlContains('/contact'), 10000);
    url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/contact');
  });

});
