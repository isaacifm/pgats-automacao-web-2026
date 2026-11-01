const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://automationexercise.com",
    watchForFileChanges: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    video: false,
    // Anúncios e rastreadores atrasam o evento "load" de cada página e podem cobrir elementos
    blockHosts: [
      "*googlesyndication.com",
      "*doubleclick.net",
      "*google-analytics.com",
      "*googletagmanager.com",
      "*googletagservices.com",
      "*adservice.google.com",
      "*fundingchoicesmessages.google.com",
      "*googleadservices.com",
    ],
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
