const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { setTimeout } = require('timers/promises');

async function clickElementWithRetries(driver, by, value, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const element = await driver.wait(until.elementIsVisible(driver.findElement(by(value))), 10000);
            await driver.executeScript("arguments[0].scrollIntoView();", element);
            await setTimeout(500); 
            
            await element.click();
            return true;
        } catch (err) {
            console.log(`Attempt ${attempt + 1} failed: ${err}`);
            await setTimeout(2000);
        }
    }
    console.log("Failed to click element after multiple attempts.");
    return false;
}

async function getChildElementsText(parentElement) {
    try {
        const childrenElements = await parentElement.findElements(By.xpath("./*"));
        const texts = [];
        for (let child of childrenElements) {
            texts.push(await child.getText());
        }
        return texts;
    } catch (err) {
        console.log("No child elements found.");
        return [];
    }
}

(async function main() {
    const options = new Options();
    options.addArguments('--start-maximized'); 

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    
    try {
        const url = "https://eservices.customs.gov.hk/MSOS/wsrh/001s1";
        await driver.get(url);

        if (await clickElementWithRetries(driver, By.id, "pubSrch_areaCd_addAlt")) {
            const chooseAreaButton = await driver.findElement(By.id("pubSrch_areaCd_addAlt"));
            await chooseAreaButton.sendKeys(Key.DOWN);
            await chooseAreaButton.sendKeys(Key.ENTER);
        } else {
            console.log("Unable to select area.");
        }

        if (!await clickElementWithRetries(driver, By.className, "app-btn-submit")) {
            console.log("Unable to click search button.");
        }
        
        await setTimeout(4000);

        while (true) {
            try {
                const rowList = await driver.wait(until.elementsLocated(By.css(".ui-widget-content.jqgrow.ui-row-ltr")), 10000);
                for (let row of rowList) {
                    const childTexts = await getChildElementsText(row);
                    for (let text of childTexts) {
                        console.log(text);
                    }
                }
                
                if (!await clickElementWithRetries(driver, By.css, ".ui-icon.ui-icon-seek-next")) {
                    console.log("No more pages available.");
                    break;
                }
                await setTimeout(2000);
            } catch (err) {
                console.log("Timeout: Rows not loaded or page took too long to respond.");
                break;
            }
        }
    } catch (err) {
        console.log(`An unexpected error occurred: ${err}`);
    } finally {
        await driver.quit();
    }
})();
