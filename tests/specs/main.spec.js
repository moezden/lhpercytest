require('dotenv').config()
const { Builder } = require('selenium-webdriver')
const HomePage = require('../pages/HomePage.js')
const PercyHandler = require('../percy/PercyHandler.js')
const Chrome = require('selenium-webdriver/chrome');
const fs = require('fs')
const testConfig = require('../../testconfig.json');
const FlightSearchPage = require('../pages/FlightSerachPage.js.js');
const BrowserFactory = require('../drivers/BrowserFactory.js');


describe("Test Cases", function () {
  let homePage, flightSearchPage, driver

  const openBrowser = async function () {
    this.driver = await BrowserFactory.createBrowser()
    await PercyHandler.initializePercy(process.env.PERCY_TOKEN)
    homePage = new HomePage(this.driver)
    flightSearchPage = new FlightSearchPage(this.driver)
  }

  const closeBrowser = async function () {
    await this.driver.quit()
  }

  describe('Verify quick action tabs appearance on home page', function () {

    before(openBrowser)
    it('Check-in tab appearance', async function () {
      await homePage.goToHomePage()
      await homePage.clickOnAcceptAllButton()
      await homePage.verifyLufthansaLogoIsVisible()
      await PercyHandler.createSnapshot(this.driver, 'Home Page')
      await homePage.clickOnCheckInToggle()
      await PercyHandler.createSnapshot(this.driver, 'Check-in Toggle on Home page')
      await homePage.clickOnMinusToggle()
    });

    it('Flight status tab appearance', async function () {
      await homePage.clickOnFlightStatusToggle()
      await PercyHandler.createSnapshot(this.driver, 'Flight Status Toggle on Home page', 1024)
      await homePage.clickOnMinusToggle()
    })

    it('My Bookings tab appearance', async function () {
      await homePage.clickOnMyBookingsToogle()
      await PercyHandler.createSnapshot(this.driver, 'My Bookings Toggle on Home page', 980)
      await homePage.clickOnMinusToggle()
    })

    it('Miles & More tab appearance', async function () {
      await homePage.clickOnMilesAndMoreButton()
      await PercyHandler.createSnapshot(this.driver, 'Miles & More Toggle on Home page', 850)
      await homePage.clickOnMinusToggle()
    })
    after(closeBrowser)
  })

  describe('Verify flight search page appearance', function () {
    before(openBrowser)
    it('Flight search page', async function () {
      await flightSearchPage.navigateToFlightSearchPage()
      await flightSearchPage.clickOnAcceptAllButton()
      await flightSearchPage.verifyFlightSearchHeaderIsVisible()
      await PercyHandler.createSnapshot(this.driver, 'Flight Search Page')
    })

    it('Flight serach page apperance after selecing one-way round trip', async function () {
      await flightSearchPage.clickOnOneWayCheckbox()
      await PercyHandler.createSnapshot(this.driver, 'Flight Search Page - Select One Way')
    })

    it('Flight serach page apperance after selecing travel class', async function () {
      await flightSearchPage.clickOnTravelClassDropdown()
      await PercyHandler.createSnapshot(this.driver, 'Travel Class Modal')
      await flightSearchPage.selectTravelClass()
      await PercyHandler.createSnapshot(this.driver, 'Flight Search Page - Select Travel Class')
    })

    it('Flight Search page appearance after selecing fare type', async function () {
      await flightSearchPage.clickOnHighestBookingClassOption()
      await PercyHandler.createSnapshot(this.driver, 'Flight Search Page - Select Fare Type')
    })
    after(closeBrowser)
  })

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const screenshot = await this.driver.takeScreenshot();
      const fileName = `failure_${Date.now()}.png`;
      fs.writeFileSync(fileName, screenshot, 'base64');
      console.log(`Screenshot captured: ${fileName}`);
    }
  });

  after(async () => { })
})