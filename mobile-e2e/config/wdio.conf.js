const path = require('path');
const fs = require('fs');

// Support both APK and Installed App via Environment Variables
const apkPath = process.env.APK_PATH || path.join(__dirname, '../app/app-release.apk');
const useApk = process.env.USE_APK === 'true' || fs.existsSync(apkPath);

const capabilities = [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554', // Can be overridden dynamically
    // Use APK if it exists or USE_APK is set, otherwise use installed app
    ...(useApk ? {
        'appium:app': apkPath,
    } : {
        'appium:appPackage': process.env.APP_PACKAGE || 'com.agrovision.mobile',
        'appium:appActivity': process.env.APP_ACTIVITY || 'com.agrovision.mobile.MainActivity',
    }),
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
}];

exports.config = {
    runner: 'local',
    port: 4723,
    path: '/',
    
    specs: [
        '../tests/**/*.test.js'
    ],
    
    exclude: [],
    
    maxInstances: 1, // Change for parallel execution
    
    capabilities: capabilities,

    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true
            }
        }]
    ],

    framework: 'mocha',
    reporters: [
        'spec',
        ['mochawesome', {
            outputDir: './reports/json',
            outputFileFormat: function(opts) { 
                return `results-${opts.cid}.json`
            }
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        require: ['chai/register-expect']
    },

    // ===== Hooks =====
    onPrepare: function (config, capabilities) {
        if (!fs.existsSync('./reports')) fs.mkdirSync('./reports');
        if (!fs.existsSync('./reports/json')) fs.mkdirSync('./reports/json');
        if (!fs.existsSync('./reports/failures')) fs.mkdirSync('./reports/failures');
        if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
    },

    beforeTest: function (test, context) {
        // Can add device log recording start here if needed
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Screenshot on failure
            const timestamp = new Date().getTime();
            const fileName = `FAILURE_${test.title.replace(/\s+/g, '_')}_${timestamp}.png`;
            const filePath = path.join(__dirname, '../reports/failures', fileName);
            await browser.saveScreenshot(filePath);

            // Fetch device logs (logcat)
            const logs = await browser.getLogs('logcat');
            const logContent = logs.map(l => `[${l.level}] ${l.message}`).join('\n');
            fs.writeFileSync(path.join(__dirname, `../reports/failures/LOG_${timestamp}.txt`), logContent);
        }
    },

    onComplete: async function(exitCode, config, capabilities, results) {
        // Will trigger Excel generation later
        const { generateExcelReport } = require('../utilities/excelReport');
        await generateExcelReport(results);
    }
};
