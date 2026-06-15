const driverWrapper = require('../utilities/DriverWrapper');
const excelReporter = require('../utilities/ExcelReporter');
const logger = require('../utilities/Logger');
const config = require('../config/selenium.config');
const path = require('path');

let executionStartTime;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

before(async function () {
  this.timeout(60000);
  executionStartTime = new Date();
  logger.info('====================================================');
  logger.info('Starting E2E Test Execution');
  logger.info(`Target Environment: ${config.baseUrl}`);
  logger.info(`Browser: ${config.browser} (Headless: ${config.headless})`);
  logger.info('====================================================');
  
  await driverWrapper.initDriver();
});

beforeEach(async function () {
  this.startTime = Date.now();
  totalTests++;
});

afterEach(async function () {
  const duration = Date.now() - this.startTime;
  const status = this.currentTest.state;
  const testName = this.currentTest.title;
  
  if (status === 'passed') {
    passedTests++;
    logger.info(`[PASS] ${testName}`);
  } else if (status === 'failed') {
    failedTests++;
    logger.error(`[FAIL] ${testName} - ${this.currentTest.err.message}`);
    
    // Take Screenshot
    let screenshotPath = '';
    try {
      screenshotPath = await driverWrapper.takeScreenshot(testName);
    } catch (e) {
      logger.error('Failed to take screenshot', e);
    }

    excelReporter.addFailedTest({
      name: testName,
      reason: this.currentTest.err.message,
      screenshot: screenshotPath,
      browser: config.browser,
      url: await driverWrapper.getCurrentUrl().catch(() => 'unknown')
    });
  }

  // Add to Test Cases sheet
  excelReporter.addTestCase({
    id: `TC-${totalTests.toString().padStart(3, '0')}`,
    module: this.currentTest.parent.title,
    scenario: testName,
    browser: config.browser,
    status: status ? status.toUpperCase() : 'SKIPPED',
    startTime: new Date(this.startTime).toISOString(),
    endTime: new Date().toISOString(),
    duration: duration
  });
  
  // Execution Log
  excelReporter.addExecutionLog({
    timestamp: new Date().toISOString(),
    testName: testName,
    step: 'Execution Completed',
    result: status ? status.toUpperCase() : 'SKIPPED',
    remarks: status === 'failed' ? this.currentTest.err.message : ''
  });
});

after(async function () {
  this.timeout(60000);
  await driverWrapper.quitDriver();
  
  const totalDuration = Date.now() - executionStartTime.getTime();
  const passPercent = ((passedTests / totalTests) * 100).toFixed(2);
  
  excelReporter.addSummary({
    date: new Date().toISOString().split('T')[0],
    env: config.baseUrl,
    total: totalTests,
    passed: passedTests,
    failed: failedTests,
    skipped: totalTests - passedTests - failedTests,
    passPercent: `${passPercent}%`,
    duration: `${(totalDuration / 1000).toFixed(2)}s`
  });

  const reportPath = path.join(__dirname, '..', config.reports.excelPath);
  await excelReporter.saveReport(reportPath);
  logger.info(`Execution finished. Excel Report saved to ${reportPath}`);
  logger.info('====================================================');
});
