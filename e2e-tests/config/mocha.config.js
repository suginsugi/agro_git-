module.exports = {
  timeout: 60000,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './reports',
    reportFilename: 'E2E_Report',
    html: true,
    json: true,
    overwrite: true,
    charts: true
  },
  ui: 'bdd'
};
