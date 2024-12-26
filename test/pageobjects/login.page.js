const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class LoginPage {
    // Elementos da página de login
    get loginPageButton() { return $('~Login'); }
    get signupbutton() { return $('//android.widget.TextView[@text="Sign up"]'); }
    get inputUsername() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get inputRepeatPassword() { return $('~input-repeat-password'); }
    get btnLogin() { return $('~button-LOGIN'); }
    get btnSignUp() { return $('//android.widget.TextView[@text="SIGN UP"]'); }

    // Mensagens de erro
    get emailinvaliderrormessage() { return $('//android.widget.TextView[@text="Please enter a valid email address"]'); }
    get passwordinvaliderrormessage() { return $('//android.widget.TextView[@text="Please enter at least 8 characters"]'); }
    get repeatPasswordErrorMessage() { return $('//android.widget.TextView[@text="Please enter the same password"]'); } 
    get successmessage() { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }
    get okbuttonsuccessmessage() { return $('//android.widget.Button[@resource-id="android:id/button1"]'); }
    get successgetinmessage() { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }

    // Função de login
    async login(username, password) {
        await this.loginPageButton.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        await this.successgetinmessage.waitForDisplayed({ timeout: 5000 });
        const message = await this.successgetinmessage.getText();
        assert.strictEqual(message, 'You are logged in!', `Expected 'You are logged in!', but got '${message}'`);
        await this.okbuttonsuccessmessage.click();
    }

    // Função de signup
    async signup(username, password) {
        await this.signupbutton.click(); 
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(password); 
        await this.btnSignUp.click();
        await this.successgetinmessage.waitForDisplayed({ timeout: 5000 });
        const message = await this.successgetinmessage.getText();
        assert.strictEqual(message, 'You successfully signed up!', `Expected 'You successfully signed up!', but got '${message}'`);
        await this.okbuttonsuccessmessage.click();
    }

    // Função para obter erro de email (tela de login)
    async getEmailErrorMessage(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        return await this.emailinvaliderrormessage.getText();
    }

    // Função para obter erro de senha (tela de login)
    async getPasswordErrorMessage(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        return await this.passwordinvaliderrormessage.getText();
    }

    // Função para obter erro de email (tela de signup)
    async getEmailErrorMessageSignup(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(password); 
        await this.btnSignUp.click();
        return await this.emailinvaliderrormessage.getText();
    }

    // Função para obter erro de senha (tela de signup)
    async getPasswordErrorMessageSignup(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(password); 
        await this.btnSignUp.click();
        return await this.passwordinvaliderrormessage.getText();
    }

    // Função para obter erro de senha não coincidente (tela de signup)
    async getRepeatPasswordErrorMessageSignup(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue('incorrectPassword'); 
        await this.btnSignUp.click();
        return await this.repeatPasswordErrorMessage.getText();
    }
}

module.exports = new LoginPage();
