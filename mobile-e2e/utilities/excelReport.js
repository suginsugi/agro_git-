const ExcelJS = require('exceljs');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

async function generateExcelReport(results) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'AgroVision Automation Framework';
    workbook.created = new Date();

    const reportDir = path.join(__dirname, '../reports/excel');
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

    // --- Sheet 1: Summary ---
    const summarySheet = workbook.addWorksheet('Summary');
    summarySheet.columns = [
        { header: 'Execution Date', key: 'date', width: 20 },
        { header: 'Device Name', key: 'device', width: 25 },
        { header: 'Android Version', key: 'version', width: 15 },
        { header: 'Total Tests', key: 'total', width: 15 },
        { header: 'Passed', key: 'passed', width: 10 },
        { header: 'Failed', key: 'failed', width: 10 },
        { header: 'Skipped', key: 'skipped', width: 10 },
        { header: 'Pass Percentage', key: 'percentage', width: 15 },
        { header: 'Execution Duration', key: 'duration', width: 20 }
    ];

    // Style header
    summarySheet.getRow(1).font = { bold: true };

    const total = results.success + results.failed;
    const passPercentage = total === 0 ? 0 : ((results.success / total) * 100).toFixed(2) + '%';

    summarySheet.addRow({
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        device: process.env.DEVICE_NAME || 'Android Emulator',
        version: process.env.OS_VERSION || '11.0',
        total: total,
        passed: results.success,
        failed: results.failed,
        skipped: 0, // Mochawesome handles skips, raw results object may vary
        percentage: passPercentage,
        duration: 'N/A' // Requires global start/end tracking
    });

    // --- Sheet 2: Test Cases ---
    const testCasesSheet = workbook.addWorksheet('Test Cases');
    testCasesSheet.columns = [
        { header: 'Test ID', key: 'id', width: 10 },
        { header: 'Module', key: 'module', width: 20 },
        { header: 'Scenario', key: 'scenario', width: 40 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Duration (ms)', key: 'duration', width: 15 }
    ];
    testCasesSheet.getRow(1).font = { bold: true };
    // Data will be parsed from mochawesome JSON if needed, or runner results.

    // --- Sheet 3: Failed Tests ---
    const failedSheet = workbook.addWorksheet('Failed Tests');
    failedSheet.columns = [
        { header: 'Test Name', key: 'name', width: 40 },
        { header: 'Failure Reason', key: 'reason', width: 50 },
        { header: 'Screenshot Path', key: 'screenshot', width: 40 }
    ];
    failedSheet.getRow(1).font = { bold: true };

    // --- Sheet 4: Execution Logs ---
    const logsSheet = workbook.addWorksheet('Execution Logs');
    logsSheet.columns = [
        { header: 'Timestamp', key: 'timestamp', width: 25 },
        { header: 'Level', key: 'level', width: 10 },
        { header: 'Message', key: 'message', width: 80 }
    ];
    logsSheet.getRow(1).font = { bold: true };

    // Read winston log and populate
    const logPath = path.join(__dirname, '../logs/execution.log');
    if (fs.existsSync(logPath)) {
        const logData = fs.readFileSync(logPath, 'utf8').split('\n');
        logData.forEach(line => {
            if (line) {
                // simple parsing [YYYY-MM-DD HH:mm:ss] LEVEL: message
                const match = line.match(/^\[(.*?)\] (.*?): (.*)$/);
                if (match) {
                    logsSheet.addRow({ timestamp: match[1], level: match[2], message: match[3] });
                }
            }
        });
    }

    const reportPath = path.join(reportDir, `Mobile_E2E_Report_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    await workbook.xlsx.writeFile(reportPath);
    console.log(`Excel Report generated at: ${reportPath}`);
}

module.exports = { generateExcelReport };
