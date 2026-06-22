const { expect } = require('chai');
const baseTest = require('./BaseTest');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const logger = require('../utilities/Logger');

describe('Authentication Module E2E', function () {
  let loginPage;
  let dashboardPage;

  before(async function () {
    await baseTest.setup();
    const driver = baseTest.getDriver();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
  });

  after(async function () {
    await baseTest.teardown();
  });

  it('TC_AUTH_01: Should show error for empty username', async function () {
    logger.info('Running TC_AUTH_01');
    await loginPage.loginAs('', 'password123');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).to.include('Username is required');
  });

  it('TC_AUTH_02: Should show error for invalid credentials', async function () {
    logger.info('Running TC_AUTH_02');
    await loginPage.loginAs('invalidUser', 'wrongPass');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).to.include('Invalid credentials');
  });

  it('TC_AUTH_03: Should login successfully with valid credentials', async function () {
    logger.info('Running TC_AUTH_03');
    await loginPage.loginAs('testuser', 'Password!123');
    
    // Verify Dashboard
    const isAtDashboard = await dashboardPage.isAt();
    expect(isAtDashboard).to.be.true;
    
    const welcomeText = await dashboardPage.getWelcomeMessage();
    expect(welcomeText).to.include('Welcome');
  });

  it('TC_AUTH_04: Should logout successfully', async function () {
    logger.info('Running TC_AUTH_04');
    await dashboardPage.logout();
    
    // Verify returned to Login Page
    const isAtLogin = await loginPage.isAt();
    expect(isAtLogin).to.be.true;
  });
});
