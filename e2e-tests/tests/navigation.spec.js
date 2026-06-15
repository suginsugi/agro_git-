const { expect } = require('chai');
const navigationPage = require('../pages/NavigationPage');
const driverWrapper = require('../utilities/DriverWrapper');

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
    const url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/dashboard');
  });

  it('should handle browser back and forward correctly', async function () {
    await navigationPage.navigateTo('');
    await navigationPage.navigateToContact();
    let url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/contact');

    await navigationPage.goBack();
    url = await navigationPage.getCurrentUrl();
    expect(url).to.not.include('/contact');

    await navigationPage.goForward();
    url = await navigationPage.getCurrentUrl();
    expect(url).to.include('/contact');
  });

});
