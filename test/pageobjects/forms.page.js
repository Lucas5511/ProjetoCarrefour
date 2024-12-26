const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class FormsPage {
    // Elementos
    get textInputField() { return $('~text-input'); } // Campo de texto
    get inputTextResult() { return $('~input-text-result'); } // Resultado do texto inserido
    get switchButton() { return $('~switch'); } // Botão de alternância (switch)
    
    

    // Métodos de interação
    async fillTextInput(text) {
        await this.textInputField.waitForDisplayed({ timeout: 5000 });
        await this.textInputField.setValue(text);
    }
    // Métodos de verificação
    async verifyTextInputValue(expectedText) {
        const actualText = await this.getInputTextResult();
        assert.strictEqual(
            actualText,
            expectedText,
            `Esperado que o texto fosse "${expectedText}", mas foi "${actualText}"`
        );
    }

    async toggleSwitch() {
        await this.switchButton.waitForDisplayed({ timeout: 5000 });
        await this.switchButton.click();
    }

    

    

    
    async getInputTextResult() {
        await this.inputTextResult.waitForDisplayed({ timeout: 5000 });
        return await this.inputTextResult.getText(); // Obtém o texto do resultado
    }

    

    async verifySwitchState(expectedState) {
        const switchValue = await this.switchButton.getAttribute('checked');
        const isSwitchOn = switchValue === 'true';
        assert.strictEqual(
            isSwitchOn,
            expectedState,
            `Esperado que o switch estivesse ${expectedState ? 'ligado' : 'desligado'}, mas está ${isSwitchOn ? 'ligado' : 'desligado'}`
        );
    }

    
}

module.exports = new FormsPage();
