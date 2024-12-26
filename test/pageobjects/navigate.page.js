const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class NavigatePage {
    // Elementos da navegação
    get webviewButton() { return $('~Webview'); }
    get loginButton() { return $('~Login'); }
    get formsButton() { return $('~Forms'); }
    get swipeButton() { return $('~Swipe'); }
    get dragButton() { return $('~Drag'); }

    // Métodos para navegação
    async navigateToWebview() {
        await this.webviewButton.click();
    }
    async verifyWebview() {
        await this.webviewButton.isDisplayed();
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

    async navigateToDrag() {
        await this.dragButton.click();
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
