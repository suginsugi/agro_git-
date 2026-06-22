require('dotenv').config();
const path = require('path');

const config = {
  // Appium server capabilities
  serverParams: {
    hostname: process.env.APPIUM_HOST || '127.0.0.1',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    path: '/',
    logLevel: 'info'
  },

  // Android Capabilities
  androidCapabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_Emulator',
    'appium:app': process.env.APK_PATH ? path.resolve(__dirname, '..', process.env.APK_PATH) : undefined,
    'appium:appPackage': process.env.APP_PACKAGE || 'com.agrovision.app',
    'appium:appActivity': process.env.APP_ACTIVITY || 'com.agrovision.app.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 300,
  }
};

module.exports = config;
