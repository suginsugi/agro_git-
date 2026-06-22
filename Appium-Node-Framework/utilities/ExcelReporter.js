const ExcelJS = require('exceljs');
const path = require('path');
const logger = require('./Logger');

class ExcelReporter {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = 'AgriVision QA Automation';
    this.workbook.created = new Date();
    this.reportPath = path.join(__dirname, '../excel/Mobile_E2E_Report.xlsx');
  }

  async generateReport(executionData, testCases, failedTests, logs) {
    logger.info('Generating Excel Report...');
    
    // Sheet 1: Summary
    const summarySheet = this.workbook.addWorksheet('Summary');
    summarySheet.columns = [
      { header: 'Execution Date', key: 'date', width: 20 },
      { header: 'Device Name', key: 'device', width: 25 },
      { header: 'Android Version', key: 'version', width: 15 },
      { header: 'Total Tests', key: 'total', width: 15 },
      { header: 'Passed', key: 'passed', width: 15 },
      { header: 'Failed', key: 'failed', width: 15 },
      { header: 'Skipped', key: 'skipped', width: 15 },
      { header: 'Pass Percentage', key: 'percent', width: 20 },
      { header: 'Execution Duration', key: 'duration', width: 20 }
    ];
    summarySheet.addRow(executionData);

    // Sheet 2: Test Cases
    const testSheet = this.workbook.addWorksheet('Test Cases');
    testSheet.columns = [
      { header: 'Test ID', key: 'id', width: 15 },
      { header: 'Module', key: 'module', width: 20 },
      { header: 'Scenario', key: 'scenario', width: 40 },
      { header: 'Device', key: 'device', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Start Time', key: 'start', width: 20 },
      { header: 'End Time', key: 'end', width: 20 },
      { header: 'Duration', key: 'duration', width: 15 }
    ];
    testSheet.addRows(testCases);

    // Sheet 3: Failed Tests
    const failedSheet = this.workbook.addWorksheet('Failed Tests');
    failedSheet.columns = [
      { header: 'Test Name', key: 'name', width: 40 },
      { header: 'Failure Reason', key: 'reason', width: 50 },
      { header: 'Screenshot Path', key: 'screenshot', width: 40 },
      { header: 'Device', key: 'device', width: 20 },
      { header: 'Android Version', key: 'version', width: 15 },
      { header: 'Activity Name', key: 'activity', width: 25 }
    ];
    failedSheet.addRows(failedTests);

    // Sheet 4: Execution Logs
    const logSheet = this.workbook.addWorksheet('Execution Logs');
    logSheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'Test Name', key: 'test', width: 30 },
      { header: 'Step', key: 'step', width: 40 },
      { header: 'Result', key: 'result', width: 15 },
      { header: 'Remarks', key: 'remarks', width: 40 }
    ];
    logSheet.addRows(logs);

    // Save
    await this.workbook.xlsx.writeFile(this.reportPath);
    logger.info(`Excel Report generated successfully at: ${this.reportPath}`);
  }
}

module.exports = new ExcelReporter();
