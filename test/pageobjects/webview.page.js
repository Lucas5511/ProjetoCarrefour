const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class WebViewPage {
    // Elementos da página inicial
    get getStartedButton() { return driver.isAndroid ? $('~Get Started') : $('//XCUIElementTypeStaticText[@name="Get Started"]'); }
    get whyWebdriverIOButton() { return driver.isAndroid ? $('~Why WebdriverIO?') : $('//XCUIElementTypeStaticText[@name="Why WebdriverIO?"]'); }
    get viewOnGitHubButton() { return driver.isAndroid ? $('~View on GitHub') : $('//XCUIElementTypeStaticText[@name="View on GitHub"]'); }
    get closeDoc() { return driver.isAndroid ? $('//android.widget.Button[@text="Close"]') : $('//XCUIElementTypeButton[@name="Close"]'); }

   
    // Métodos para verificar se os elementos estão visíveis na página
    async verifyGetStartedVisible() {
        
        await this.verifyElementVisible(this.getStartedButton);
    }

    async verifyWhyWebdriverIOVisible() {
        
        await this.verifyElementVisible(this.whyWebdriverIOButton);
    }

    async verifyViewOnGitHubVisible() {
        
        await this.verifyElementVisible(this.viewOnGitHubButton);
    }

   
    async closeDocument() {
        await this.closeDoc.click();
    }
    
    
    
    // Verificar se um elemento está visível
    async verifyElementVisible(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        assert.isTrue(await element.isDisplayed(), `O elemento ${element.selector} não está visível`);
    }
}

module.exports = new WebViewPage();
