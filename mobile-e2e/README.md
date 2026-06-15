# Enterprise Appium E2E Automation Framework

This is a production-ready End-to-End mobile automation framework built with **Appium 2.x, Node.js, WebdriverIO (v8), and Mocha**.

## Features
- **Page Object Model (POM)** architecture
- **WebdriverIO** for standard robust Appium bindings
- Supports both **APK** execution and **Installed Application** testing
- Advanced **Gestures** utility (Swipe, Scroll, Long Press)
- **Winston** for detailed logging
- **ExcelJS** for enterprise-grade `.xlsx` reporting
- **Mochawesome** for visual HTML reporting
- Fully integrated with **GitHub Actions** for CI/CD

## Prerequisites
- Node.js (v16+)
- Java (JDK 11+)
- Android SDK & Android Studio (for emulator)
- Appium 2.x `npm install -g appium`
- UIAutomator2 Driver `appium driver install uiautomator2`

## Installation
1. Navigate to the directory:
   ```bash
   cd mobile-e2e
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
Update environment variables or `/config/wdio.conf.js`:
- `APK_PATH`: Path to your `.apk` (e.g. `./app/app-release.apk`)
- `USE_APK`: `true` to use APK, `false` to use installed app on device.
- `APP_PACKAGE` & `APP_ACTIVITY`: Target if not using APK.

## Execution
Start the Appium server manually if not using wdio appium service:
```bash
appium
```

Run tests locally:
```bash
npm run test
```

Generate Mochawesome HTML Report:
```bash
npm run report
```

## Reports & Artifacts
After execution, check the following directories:
- `reports/excel/` - Contains the `Mobile_E2E_Report.xlsx` with Summary, Cases, Failures, and Logs.
- `reports/html/` - Contains the visual Mochawesome report.
- `reports/failures/` - Contains screenshots and logcat dumps of any failed tests.
- `logs/` - Winston execution and error logs.
