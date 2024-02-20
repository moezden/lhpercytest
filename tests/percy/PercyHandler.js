const axios = require('axios');
const percySnapshot = require("@percy/selenium-webdriver");

let percyToken;

class PercyHandler {
    constructor(driver) {
        this.driver = driver
    }
    /**
     * Initializes Percy with the provided token.
     * @param {string} token - The Percy token to use for capturing snapshots.
     */
    static async initializePercy(token) {
        percyToken = token
    }

    /**
     * Checks the health status of Percy.
     * @returns {boolean} - True if Percy is healthy and operational, false otherwise.
     */
    static async percyCheckHealth() {
        try {
            const response = await axios.get('https://percy.io/percy/healthcheck')
            if (response.status === 200) {
                return true
            } else {
                console.error("Unexpected status code: ", response.status)
                return false
            }
        } catch (error) {
            console.error('Error occured while checking Percy health: ', error.message)
            return false
        }
    }

    /**
     * Creates a snapshot using Percy.
     * @param {string} snapshotName - The name to give to the snapshot.
     */
    static async createSnapshot(driver, snapshotName) {
        const isPercyHealthy = await this.percyCheckHealth()
        if (!isPercyHealthy) {
            throw new Error('Percy is not healthy. Cannot capture snapshot.')
        }

        try {
            if (!percyToken) {
                throw new Error('Percy is no initialized. Please call initialzePercy() first')
            }

            await percySnapshot(driver, snapshotName)
        } catch (error) {
            console.error('Error capturing snapshot:', error);
        }
    }

    static async createSnapshot(driver, snapshotName, width) {
        const isPercyHealthy = await this.percyCheckHealth()
        if (!isPercyHealthy) {
            throw new Error('Percy is not health. Cannot capture snapshot.')
        }

        try {
            if (!percyToken) {
                throw new Error('Percy is not initialized. Please call initializePercy() first')
            }

            await percySnapshot(driver, snapshotName, { widths: [width] })
        } catch (error) {
            console.error('Error catpuring snapshot with width: ', error)
        }
    }
}

module.exports = PercyHandler
