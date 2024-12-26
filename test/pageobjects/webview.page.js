const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class WebViewPage {
    // Elementos da página inicial
    get getStartedButton() { return $('~Get Started'); }
    get whyWebdriverIOButton() { return $('~Why WebdriverIO?'); }
    get viewOnGitHubButton() { return $('~View on GitHub'); }
   
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

  
    // Verificar se um elemento está visível
    async verifyElementVisible(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        assert.isTrue(await element.isDisplayed(), `O elemento ${element.selector} não está visível`);
    }
}

module.exports = new WebViewPage();
