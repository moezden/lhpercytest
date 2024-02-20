const { By, until, error } = require('selenium-webdriver');
const SelectorType = require('./SelectorHelper')
const testConfig = require('../../testconfig.json');

class ActionHelper {
    constructor(driver) {
        this.driver = driver
    }

    /**
     * Finds an element in the DOM using either CSS or XPath selector.
     * @param {string} selectorType - Type of selector: 'CSS' or 'XPath'.
     * @param {string} locator - Locator string for the element.
     * @returns {Promise} - Promise resolving to the found element.
     */
    async findElementBySelectorType(selectorType, locator) {
        try {
            return selectorType === SelectorType.CSS ? await this.driver.findElement(By.css(locator)) : await this.driver.findElement(By.xpath(locator))
        } catch (error) {
            console.error('Error finding element: ', error)
            throw error
        }
    }

    /**
     * Waits until the specified element is both visible and enabled on the page.
     * @param {WebElement} element - The element to wait for.
     * @returns {Promise} - Promise resolving when the element is visible and enabled.
     */
    async waitUntilElementEnabled(element) {
        try {
            await this.driver.wait(until.elementIsVisible(element), testConfig.defaultElementTimeout, 'Element is not visible!')
            await this.driver.wait(until.elementIsEnabled(element), testConfig.defaultElementTimeout, 'Element is not enabled!')
        } catch (error) {
            console.error('Error waiting for element to be enabled: ', error)
            throw error
        }
    }

    /**
     * Clicks on an element identified by the specified selector type and locator.
     * @param {string} selectorType - The type of selector to be used (either 'CSS' or 'XPath').
     * @param {string} locator - The locator string used to identify the element.
     * @returns {Promise} - A promise resolving after the element is clicked.
     */
    async click(selectorType, locator) {
        try {
            const element = await this.findElementBySelectorType(selectorType, locator)
            await this.waitUntilElementEnabled(element)
            await this.delay(2000)
            await element.click()
        } catch (error) {
            console.error('Error clicking on element: ', error)
            throw error
        }
    }

    /**
     * Clicks on an element identified by the specified selector type and locator using JavaScript.
     * @param {string} selectorType - The type of selector to be used (either 'CSS' or 'XPath').
     * @param {string} locator - The locator string used to identify the element.
     * @returns {Promise} - A promise resolving after the element is clicked.
     */
    async clickJS(selectorType, locator) {
        try {
            const element = await this.findElementBySelectorType(selectorType, locator)
            await this.waitUntilElementEnabled(element)
            await this.driver.executeScript('arguments[0].click()', element)
        } catch (error) {
            console.error('Error clicking on element using JavaScript: ', error)
            throw error
        }
    }

    /**
     * Delays execution for the specified duration.
     * @param {number} timeInMillis - The duration to delay in milliseconds.
     * @returns {Promise} - A promise resolving after the specified delay.
     */
    async delay(timeInMillis) {
        return await new Promise((resolve) => setTimeout(resolve, timeInMillis));
    }

    /**
     * Checks if an element identified by the specified selector type and locator is visible on the page.
     * @param {string} selectorType - The type of selector to be used (either 'CSS' or 'XPath').
     * @param {string} locator - The locator string used to identify the element.
     * @returns {Promise<boolean>} - A promise resolving to true if the element is visible, false otherwise.
     */
    async isVisible(selectorType, locator) {
        try {
            const element = await this.findElementBySelectorType(selectorType, locator);
            return await element.isDisplayed();
        } catch (err) {
            console.error('Error checking element visibility: ', err);
            throw new Error(`element is not visible: ${err}`);
        }
    }

    /**
     * Scrolls the page to bring the specified element identified by the selector type and locator into view.
     * @param {string} selectorType - The type of selector to be used (either 'CSS' or 'XPath').
     * @param {string} locator - The locator string used to identify the element.
     * @returns {Promise} - A promise resolving after the page scrolls.
     */
    async scrollIntoView(selectorType, locator) {
        try {
            const element = await this.findElementBySelectorType(selectorType, locator)
            const javascript = 'arguments[0].scrollIntoView(true)'
            await this.driver.executeScript(javascript, element)
        } catch (error) {
            console.error('Error scrolling element into view: ', error)
            throw error
        }
    }

    /**
     * Navigates the browser to the specified URL.
     * @param {string} url - The URL to navigate to.
     * @returns {Promise} - A promise resolving after the navigation is complete.
     */
    async navigateTo(url) {
        try {
            await this.driver.get(url)
        } catch (error) {
            throw new Error('Error navigating to URL: ', error)
        }
    }
}

module.exports = ActionHelper