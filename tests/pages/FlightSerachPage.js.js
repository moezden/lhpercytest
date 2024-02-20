const { expect } = require('chai');
const ActionHelper = require('../helpers/ActionHelper');
const SelectorType = require('../helpers/SelectorHelper');
const testConfig = require("../../testconfig.json")

class FlightSearchPage {
    constructor(driver) {
        this.driver = driver
        this.actionHelper = new ActionHelper(driver)
    }

    /**
     * Navigates the browser to the flight search page URL.
     * @returns {Promise} - A promise resolving after the navigation is complete.
     */
    async navigateToFlightSearchPage() {
        await this.actionHelper.navigateTo(testConfig.flightSearchPageUrl)
    }

    /**
     * Clicks on the "Accept All" button to accept all cookies or similar consent on the webpage.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnAcceptAllButton() {
        await this.actionHelper.click(SelectorType.CSS, 'button#cm-acceptAll')
    }

    /**
     * Verifies if the flight search header is visible on the webpage.
     * @returns {Promise} - A promise resolving after the verification is complete.
     */
    async verifyFlightSearchHeaderIsVisible() {
        const header = await this.actionHelper.isVisible(SelectorType.CSS, '[class="heading-large"]')
        expect(header).to.be.true
    }

    /**
     * Clicks on the checkbox for selecting one-way flight option.
     * @returns {Promise} - A promise resolving after the checkbox is clicked.
     */
    async clickOnOneWayCheckbox() {
        await this.actionHelper.click(SelectorType.CSS, '[class="custom-control custom-checkbox"]')
    }

    /**
     * Clicks on the dropdown button for selecting the travel class.
     * @returns {Promise} - A promise resolving after the dropdown button is clicked.
     */
    async clickOnTravelClassDropdown() {
        await this.actionHelper.clickJS(SelectorType.CSS, '[class="btn btn-secondary mb-0 dropdown-btn"]')
    }

    /**
     * Clicks on the dropdown button within the flight modal form.
     * @returns {Promise} - A promise resolving after the dropdown button is clicked.
     */
    async clickOnFlightModalFormDropdown() {
        await this.actionHelper.click(SelectorType.XPATH, '(//button[@aria-label="open menu"])[1]')
    }

    /**
     * Selects the business travel class option within the flight modal form.
     * @returns {Promise} - A promise resolving after the business travel class option is selected.
     */
    async selectBusinessTravelClass() {
        await this.actionHelper.click(SelectorType.CSS, 'li[id*="advs-flight-modalForm.flightQuery.cabin-item-2"]')
    }

    /**
     * Clicks on the "Continue" button within a modal.
     * @returns {Promise} - A promise resolving after the button is clicked.
     */
    async clickOnContinueButton() {
        await this.actionHelper.click(SelectorType.CSS, 'div[class="modal-footer"] button[class="btn btn-primary"]')
    }

    /**
     * Selects the travel class within the flight modal form.
     * @returns {Promise} - A promise resolving after the travel class is selected.
     */
    async selectTravelClass() {
        await this.clickOnFlightModalFormDropdown()
        await this.selectBusinessTravelClass()
        await this.clickOnContinueButton()
    }

    /**
     * Clicks on the option representing the highest booking class within a flight query form.
     * @returns {Promise} - A promise resolving after the option is clicked.
     */
    async clickOnHighestBookingClassOption() {
        await this.actionHelper.click(SelectorType.CSS, '[id*="advs-flight-flightQuery.fareOption-highestBookingClass-label"]')
    }
}

module.exports = FlightSearchPage