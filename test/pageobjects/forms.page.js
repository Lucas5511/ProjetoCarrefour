const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class FormsPage {
    // Elementos
    get textInputField() { return driver.isAndroid ? $('~text-input') : $('//XCUIElementTypeTextField[@name="text-input"]');}    
    get inputTextResult() { return driver.isAndroid ? $('~input-text-result') : $('//XCUIElementTypeStaticText[@name="input-text-result"]');}    
    get switchButton() { return driver.isAndroid ? $('~switch') : $('//XCUIElementTypeSwitch[@name="switch"]');}
    
    

    // Métodos de interação
    async fillTextInput(text) {
        await this.textInputField.waitForDisplayed({ timeout: 5000 });
        await this.textInputField.setValue(text);
        await this.inputTextResult.click();
    }
    // Métodos de verificação
    async verifyTextInputValue(expectedText) {
        const actualText = await this.getInputTextResult();
        assert.strictEqual(
            actualText,
            expectedText,
            `Esperado que o texto fosse "${expectedText}", mas foi "${actualText}"`
        );
        await this.inputTextResult.click();
    }

    async toggleSwitch() {
        await this.switchButton.waitForDisplayed({ timeout: 5000 });
        await this.switchButton.click();
    }

    

    

    
    async getInputTextResult() {
        await this.inputTextResult.waitForDisplayed({ timeout: 5000 });
        return await this.inputTextResult.getText(); // Obtém o texto do resultado
    }

    constructor() {
        this.switchButton = $('~switch'); // Your selector for the switch
      }

      static async isSwitchOn() {
        if (driver.isAndroid) {
          const switchElement = await $('~switch'); // Access switch element directly
          return await switchElement.getAttribute('checked') === 'true';
        } else {
          const switchElement = await $('~switch');
          const value = await switchElement.getAttribute('value');
          return value === '1';
        }
      }
    
    async verifySwitchState(expectedState) {
        const isSwitchOn = await isSwitchOn(this.switchButton); // Usando a função auxiliar
    
        assert.strictEqual(
            isSwitchOn,
            expectedState,
            `Esperado que o switch estivesse ${expectedState ? 'ligado' : 'desligado'}, mas está ${isSwitchOn ? 'ligado' : 'desligado'}`
        );
    }

    
}

module.exports = new FormsPage();
