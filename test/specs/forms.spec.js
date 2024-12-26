const formsPage = require('../pageobjects/forms.page');
const navigatePage = require('../pageobjects/navigate.page');

describe('Forms Page Tests', () => {
    beforeEach(async () => {
         await navigatePage.verifyWebview();
         await navigatePage.navigateToForms();
         });
    it('deve preencher o campo de texto e verificar o resultado', async () => {
        const textToInput = 'Teste de Input';
        await formsPage.fillTextInput(textToInput);
        await formsPage.verifyTextInputValue(textToInput);
    });

    it('deve alternar o interruptor e verificar seu estado', async () => {
        await formsPage.toggleSwitch();
        await formsPage.verifySwitchState(true); // Espera que o switch esteja ligado
        await formsPage.toggleSwitch();
        await formsPage.verifySwitchState(false); // Espera que o switch esteja desligado
    });

    
});
