const { expect } = require('chai');
const baseTest = require('./BaseTest');
const LoginPage = require('../pages/LoginPage');
const logger = require('../utilities/Logger');

describe('Form Validation Rules E2E', function () {
  let loginPage;

  before(async function () {
    await baseTest.setup();
    const driver = baseTest.getDriver();
    loginPage = new LoginPage(driver);
  });

  after(async function () {
    await baseTest.teardown();
  });

  it('TC_VAL_01: Validate minimum password length rule', async function () {
    logger.info('Running TC_VAL_01');
    await loginPage.enterCredentials('user1', '123');
    await loginPage.clickLogin();
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).to.include('Password must be at least 8 characters');
  });

  it('TC_VAL_02: Validate password complexity rule', async function () {
    logger.info('Running TC_VAL_02');
    await loginPage.enterCredentials('user1', 'password');
    await loginPage.clickLogin();
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).to.include('Password must contain uppercase and number');
  });
});
