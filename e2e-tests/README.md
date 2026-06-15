# AgroVision Selenium E2E Framework

This is a production-ready, highly scalable End-to-End (E2E) automation testing framework for the AgroVision React application using Node.js, Selenium WebDriver, Mocha, Chai, and ExcelJS.

## Key Features
- **Page Object Model (POM)**: Clean separation of UI logic and test logic.
- **Dynamic Form Validation**: Automatically crawls routes and tests HTML5 form rules.
- **Advanced Reporting**: Generates `.xlsx` reports (with summary, execution logs, passed/failed sheets) and Mochawesome HTML reports.
- **Winston Logger**: Comprehensive test execution logging.
- **Screenshot on Failure**: Automatically captures UI screenshots on assertion or runtime errors.

## Directory Structure
- `/config`: Selenium capabilities and Mocha test runner configurations.
- `/pages`: Page Objects.
- `/tests`: Mocha test suites (`.spec.js`).
- `/utilities`: Driver wrappers, custom loggers, form validators, and Excel reporters.
- `/reports`: Holds generated HTML reports and screenshots.
- `/logs`: Execution and Error logs.
- `/excel`: Output directory for `E2E_Report.xlsx`.

## Setup
1. Ensure Node.js (v18+) is installed.
2. Install dependencies:
   ```bash
   npm install
   ```

## Execution
Run all tests headlessly:
```bash
npm run test
```

Run tests in headed mode (UI visible):
```bash
npm run test:headed
```

Run tests in parallel:
```bash
npm run test:parallel
```

## CI/CD
This framework is integrated into the primary GitHub repository. The `.github/workflows/selenium-e2e.yml` file handles the pipeline execution on every push or PR to `main`. Artifacts (Excel reports and HTML reports) are automatically uploaded upon completion.
