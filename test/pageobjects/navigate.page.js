const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class NavigatePage {
    // Elementos da navegação, incluindo a lógica para Android e iOS
    get webviewButton() { return driver.isAndroid ? $('~Webview') : $('//XCUIElementTypeOther[@label="WebView"]'); }
    get loginButton() { return driver.isAndroid ? $('~Login') : $('//XCUIElementTypeOther[@label="Login"]'); }
    get formsButton() { return driver.isAndroid ? $('~Forms') : $('//XCUIElementTypeOther[@label="Forms"]'); }
    get swipeButton() { return driver.isAndroid ? $('~Swipe') : $('//XCUIElementTypeOther[@label="Swipe"]'); }
    

    

    // Métodos para navegação
    async navigateToWebview() {
        await this.webviewButton.click();
    }

    async verifyWebview() {
        await this.verifyElementVisible(this.webviewButton);
    }

    async navigateToLogin() {
        await this.loginButton.click();
    }

    async navigateToForms() {
        await this.formsButton.click();
    }

    async navigateToSwipe() {
        await this.swipeButton.click();
    }

    

    // Exemplo: Verifica se um botão está visível após navegação
    async verifyElementVisible(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        assert.isTrue(await element.isDisplayed(), `O elemento ${element.selector} não está visível`);
    }

    // Método genérico para navegar e verificar se está na tela certa
    async navigateAndVerify(element, destination) {
        await element.click();
        await this.verifyElementVisible(destination);
    }
}

module.exports = new NavigatePage();