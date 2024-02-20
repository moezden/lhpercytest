const testConfig = require('../../testconfig.json')
const Chrome = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');

class BrowserFactory {
    constructor(driver) {
        this.driver = driver
    }

    /**
     * Creates a WebDriver instance based on the specified browser type and headless mode.
     * @returns {WebDriver} - The WebDriver instance.
     */
    static async createBrowser() {
        this.driver = await this.createDriverFromBrowserType(testConfig.browser, testConfig.headless)
        return this.driver
    }

    /**
     * Creates a WebDriver instance based on the specified browser type and headless mode.
     * @param {string} browserType - The type of browser to create (e.g., "chrome", "safari").
     * @param {boolean} isHeadless - Whether to create the browser in headless mode.
     * @returns {WebDriver} - The WebDriver instance.
     */
    static async createDriverFromBrowserType(browserType, isHeadless) {
        console.info(`Creating the Driver from given browser: ${browserType} with Headless mode: ${isHeadless}`);
        switch (browserType) {
            case "chrome":
                this.driver = await this.createChromeBrowser(isHeadless)
                break;
            case "safari":
                this.driver = await this.createSafariBrowser(isHeadless)
                break;
            default:
                const message = "User has not selected any browser to run automation tests upon!"
                console.log(message);
                throw new Error(message)
        }
        return this.driver
    }

    /**
     * Creates a Chrome browser instance.
     * @param {boolean} isHeadless - Whether to create the browser in headless mode.
     * @returns {WebDriver} - The WebDriver instance.
     */
    static async createChromeBrowser(isHeadless) {
        const options = await new Chrome.Options();
        if (isHeadless) {
            let user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
            options.addArguments(`user-agent=${user_agent}`)
            options.addArguments('--headless');
            options.addArguments('--no-sandbox')
            options.addArguments('--window-size=1920,1080')
            options.addArguments('--headless')
            options.addArguments('--disable-gpu')
            options.addArguments('--allow-running-insecure-content')
            options.addArguments("--headless")
        }
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await this.driver.manage().window().maximize()
        return this.driver
    }

    /**
     * Creates a Safari browser instance.
     * @param {boolean} isHeadless - Whether to create the browser in headless mode.
     * @returns {WebDriver} - The WebDriver instance.
     */
    static async createSafariBrowser() {
        this.driver = await new Builder().forBrowser('safari').build()
        await this.driver.manage().window().maximize()
        return this.driver
    }
}

module.exports = BrowserFactory