const { $ } = require('@wdio/globals');
const { assert } = require('chai');

class LoginPage {
    // Elementos da página de login
    get loginPageButton() { return driver.isAndroid ? $('~Login') : $('//XCUIElementTypeOther[@name="Login"]');}
    get signupbutton() { return driver.isAndroid ? $('//android.widget.TextView[@text="Sign up"]') : $('//XCUIElementTypeOther[@name="Sign up"]');}
    get inputUsername() { return driver.isAndroid ? $('~input-email') : $('//XCUIElementTypeTextField[@name="input-email"]');}
    get inputPassword() { return driver.isAndroid ? $('~input-password') : $('//XCUIElementTypeSecureTextField[@name="input-password"]');}
    get inputRepeatPassword() { return driver.isAndroid ? $('~input-repeat-password') : $('//XCUIElementTypeSecureTextField[@name="input-repeat-password"]');}
    get btnLogin() { return driver.isAndroid ? $('~button-LOGIN') : $('//XCUIElementTypeOther[@name="button-LOGIN"]');}
    get btnSignUp() { return driver.isAndroid ? $('//android.widget.TextView[@text="SIGN UP"]') : $('//XCUIElementTypeOther[@name="SIGN UP"]');}
    get emailinvaliderrormessage() { return driver.isAndroid ? $('//android.widget.TextView[@text="Please enter a valid email address"]') : $('//XCUIElementTypeStaticText[@name="Please enter a valid email address"]');}
    get passwordinvaliderrormessage() { return driver.isAndroid ? $('//android.widget.TextView[@text="Please enter at least 8 characters"]') : $('//XCUIElementTypeStaticText[@name="Please enter at least 8 characters"]');}
    get repeatPasswordErrorMessage() { return driver.isAndroid ? $('//android.widget.TextView[@text="Please enter the same password"]') : $('//XCUIElementTypeStaticText[@name="Please enter the same password"]');}
    get successmessage() { return driver.isAndroid ? $('//android.widget.TextView[@resource-id="android:id/message"]') : $('//*[@name="Success"]'); }
    get okbuttonsuccessmessage() { return driver.isAndroid ? $('//android.widget.Button[@resource-id="android:id/button1"]') : $('//*[@name="OK"]');}
    get successloginmessage() { return driver.isAndroid ? $('//android.widget.TextView[@resource-id="android:id/message"]') : $('//*[@label="You are logged in!"]'); }
    get successsigninmessage() { return driver.isAndroid ? $('//android.widget.TextView[@resource-id="android:id/message"]') : $('//*[@label="You successfully signed up!"]'); }
    
    
    // Função de login
    async login(username, password) {
        await this.loginPageButton.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        await this.successloginmessage.waitForDisplayed({ timeout: 5000 });
        const message = await this.successloginmessage.getText();
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
        await this.successsigninmessage.waitForDisplayed({ timeout: 5000 });
        const message = await this.successsigninmessage.getText();
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
        await this.signupbutton.click(); 
         
        
        return await this.emailinvaliderrormessage.getText();
    }

    // Função para obter erro de senha (tela de signup)
    async getPasswordErrorMessageSignup(username, password) {
        await this.signupbutton.click(); 
        
        
        return await this.passwordinvaliderrormessage.getText();
    }

    // Função para obter erro de senha não coincidente (tela de signup)
    async getRepeatPasswordErrorMessageSignup(username, password) {
        await this.signupbutton.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue('incorrectPassword');
        await this.btnSignUp.click(); 
        
        if (!driver.isAndroid) {
            const tryAgainButton = $('//*[contains(@name, "Try again")]');
            const isTryAgainVisible = await tryAgainButton.isDisplayed();
    
            if (isTryAgainVisible) {
                await tryAgainButton.click(); 
            }
        }
    
        return await this.repeatPasswordErrorMessage.getText();
    }
}

module.exports = new LoginPage();
