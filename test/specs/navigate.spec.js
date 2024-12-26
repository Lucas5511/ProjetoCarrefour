const navigatePage = require('../pageobjects/navigate.page');

describe('Test Navigation', () => {
     beforeEach(async () => {
        await navigatePage.verifyWebview();
        
    });
    it('deve navegar para Webview', async () => {
        await navigatePage.navigateToWebview();
    });
    
    it('deve navegar para Login', async () => {
        await navigatePage.navigateToLogin();
    });
    
    it('deve navegar para Forms', async () => {
        await navigatePage.navigateToForms();
    });
    
    it('deve navegar para Swipe', async () => {
        await navigatePage.navigateToSwipe();
    });
    
   
});