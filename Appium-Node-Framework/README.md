# Enterprise Appium E2E Automation Framework (Node.js)

This is a production-grade End-to-End (E2E) mobile automation framework for Android applications using **Appium 2.x, Node.js, Mocha, and Chai**.

## Features
- **Appium 2.x** with UiAutomator2 Driver
- **Page Object Model (POM)** Architecture
- **ExcelJS** for Enterprise reporting (4-sheet layout)
- **Mochawesome** HTML Reporting
- **Winston** for detailed logging
- **GitHub Actions** CI/CD pipeline integrated
- Native screenshot and device logcat capture on failure

## Setup Instructions

1. **Install Node.js (v18+)**
2. **Install Appium 2.x Globally:**
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   ```
3. **Install Dependencies:**
   ```bash
   cd Appium-Node-Framework
   npm install
   ```

## Execution Instructions

Start the Appium server first:
```bash
appium
```

Run all tests:
```bash
npm test
```

Run specific test suites:
```bash
npm run test:login
npm run test:form
```

Generate the Excel Report after execution:
```bash
npm run report:excel
```

## Directory Structure
- `/tests`: Mocha test specifications
- `/pages`: POM classes
- `/utilities`: Helpers (Logger, ExcelReporter, Waits, Gestures)
- `/config`: Environment configurations
- `/reports`, `/excel`, `/logs`, `/screenshots`: Artifact directories
