module.exports = {
    webdriverio: {
        desiredCapabilities: {
            chromeOptions: {
                args: ["headless", "disable-gpu"]
            },
            isHeadless: true
        }
    },
    screenshotsOnError: true
};