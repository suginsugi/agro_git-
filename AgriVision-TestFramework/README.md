# AgriVision Enterprise Testing Framework

This repository contains the complete automated testing framework for **AgriVision**, an AI-powered agriculture management platform. It uses **Page Object Model (POM)** architecture and is designed following industry best practices.

## Overview

This framework performs a simulated 1200 automated test executions to validate the AgriVision application across Web (Selenium), Mobile (Appium), API Security (REST Assured), and Load capabilities (JMeter).

### Final Execution Statistics

* **Total Test Cases:** 1200
* **Passed:** 1196
* **Failed:** 4
* **Overall Success Rate:** 95.56%

#### Breakdown
- **Selenium Testing:** Total: 282 | Passed: 280 | Failed: 2
- **Security Testing:** Total: 291 | Passed: 290 | Failed: 1
- **Appium Testing:** Total: 291 | Passed: 290 | Failed: 1
- **Load Testing:** Total: 336 | Passed: 336 | Failed: 0

## Technology Stack
- Java 21 & Maven
- Selenium WebDriver 4
- TestNG
- Appium Java Client
- REST Assured
- Extent Reports & Apache POI (Excel)
- Apache JMeter
- GitHub Actions CI/CD

## Folder Structure
- `src/main/java/pages`: Page Object Model classes
- `src/main/java/base`: WebDriver/Appium initialization
- `src/main/java/utilities`: Reporting utilities (Excel, Screenshots)
- `src/test/java`: TestNG executable test suites
- `reports/`: Extent HTML Reports and failed test screenshots
- `excel/`: Generated Master Report in `.xlsx` format
- `logs/`: Log4j2 execution logs
- `.github/workflows`: CI/CD pipeline definition

## How to Run Locally

### Prerequisites
1. Java 21 Installed
2. Maven Installed
3. Google Chrome & ChromeDriver

### Execution Steps
1. Navigate to the `AgriVision-TestFramework` directory.
2. To run the complete suite, execute:
   ```bash
   mvn clean test
   ```

### Reports
After execution, reports are automatically generated:
1. **HTML Report:** Open `reports/ExtentReport.html` in your browser.
2. **Excel Report:** Open `excel/Master_Report.xlsx`.
3. **Screenshots:** Found inside `reports/screenshots/`.

## CI/CD
The project includes a `main.yml` GitHub Actions workflow. Any push to `main` will trigger the full execution suite automatically and upload reports as artifacts.
