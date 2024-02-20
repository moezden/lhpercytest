const { expect } = require('chai');
const SelectorType = require('../helpers/SelectorHelper');
const testConfig = require("../../testconfig.json");
const ActionHelper = require("../helpers/ActionHelper");

class HomePage {
    constructor(driver) {
        this.driver = driver
        this.actionHelper = new ActionHelper(driver)
    }

    /**
     * Navigates the browser to the home page of the application.
     * @returns {Promise} - A promise resolving after the navigation is complete.
     */
    async goToHomePage() {
        await this.actionHelper.navigateTo(testConfig.homePageUrl)
    }

    /**
     * Clicks on the "Accept All" button to accept all cookies or similar consent on the webpage.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnAcceptAllButton() {
        await this.actionHelper.click(SelectorType.CSS, 'button#cm-acceptAll')
    }

    /**
     * Verifies if the Lufthansa logo is visible on the webpage.
     * @returns {Promise} - A promise resolving after the verification is complete.
     */
    async verifyLufthansaLogoIsVisible() {
        const logoVisibility = await this.actionHelper.isVisible(SelectorType.CSS, '.common-header-logo-image')
        expect(logoVisibility).to.be.true
    }

    /**
     * Clicks on the toggle button to access the check-in section.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnCheckInToggle() {
        await this.actionHelper.scrollIntoView(SelectorType.CSS, 'a[href*="checkIn-section"]')
        await this.actionHelper.click(SelectorType.CSS, 'a[href*="checkIn-section"]')
    }

    /**
     * Clicks on the toggle button to access the flight status section.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnFlightStatusToggle() {
        await this.actionHelper.click(SelectorType.CSS, 'a[href*="flightStatus-section"]')
    }

    /**
     * Clicks on the toggle button to access the "My Bookings" section.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnMyBookingsToogle() {
        await this.actionHelper.click(SelectorType.CSS, 'a[href*="myBookings-section"]')
    }

    /**
     * Clicks on the button to access the "Miles & More" section.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnMilesAndMoreButton() {
        await this.actionHelper.click(SelectorType.CSS, 'a[href*="milesMore-section"]')
    }

    /**
     * Clicks on the minus toggle button to collapse a section.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnMinusToggle() {
        await this.actionHelper.click(SelectorType.CSS, '[class*="minus"]')
    }
}

module.exports = HomePage