const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

class ExcelReporter {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.summarySheet = this.workbook.addWorksheet('Summary');
    this.testCasesSheet = this.workbook.addWorksheet('Test Cases');
    this.failedTestsSheet = this.workbook.addWorksheet('Failed Tests');
    this.executionLogsSheet = this.workbook.addWorksheet('Execution Logs');

    this.setupHeaders();
  }

  setupHeaders() {
    // Summary Sheet
    this.summarySheet.columns = [
      { header: 'Execution Date', key: 'date', width: 20 },
      { header: 'Environment', key: 'env', width: 15 },
      { header: 'Total Tests', key: 'total', width: 15 },
      { header: 'Passed', key: 'passed', width: 15 },
      { header: 'Failed', key: 'failed', width: 15 },
      { header: 'Skipped', key: 'skipped', width: 15 },
      { header: 'Pass Percentage', key: 'passPercent', width: 20 },
      { header: 'Execution Duration', key: 'duration', width: 25 }
    ];

    // Test Cases Sheet
    this.testCasesSheet.columns = [
      { header: 'Test ID', key: 'id', width: 15 },
      { header: 'Module', key: 'module', width: 20 },
      { header: 'Scenario Name', key: 'scenario', width: 40 },
      { header: 'Browser', key: 'browser', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Start Time', key: 'startTime', width: 20 },
      { header: 'End Time', key: 'endTime', width: 20 },
      { header: 'Duration (ms)', key: 'duration', width: 15 }
    ];

    // Failed Tests Sheet
    this.failedTestsSheet.columns = [
      { header: 'Test Name', key: 'name', width: 40 },
      { header: 'Failure Reason', key: 'reason', width: 60 },
      { header: 'Screenshot Path', key: 'screenshot', width: 40 },
      { header: 'Browser', key: 'browser', width: 15 },
      { header: 'URL', key: 'url', width: 40 }
    ];

    // Execution Logs Sheet
    this.executionLogsSheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'Test Name', key: 'testName', width: 40 },
      { header: 'Step Description', key: 'step', width: 60 },
      { header: 'Result', key: 'result', width: 15 },
      { header: 'Remarks', key: 'remarks', width: 40 }
    ];

    [this.summarySheet, this.testCasesSheet, this.failedTestsSheet, this.executionLogsSheet].forEach(sheet => {
      sheet.getRow(1).font = { bold: true };
      sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };
    });
  }

  addSummary(data) {
    this.summarySheet.addRow(data);
  }

  addTestCase(data) {
    this.testCasesSheet.addRow(data);
  }

  addFailedTest(data) {
    this.failedTestsSheet.addRow(data);
  }

  addExecutionLog(data) {
    this.executionLogsSheet.addRow(data);
  }

  async saveReport(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await this.workbook.xlsx.writeFile(filePath);
  }
}

module.exports = new ExcelReporter();
