require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  browser: process.env.BROWSER || 'chrome', // chrome, firefox, edge
  headless: process.env.HEADLESS !== 'false', // Default to headless
  timeouts: {
    implicit: 10000,
    pageLoad: 30000,
    script: 30000,
    explicit: 15000,
  },
  reports: {
    excelPath: './excel/E2E_Report.xlsx',
    screenshotsDir: './reports/failures/',
  }
};
