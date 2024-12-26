const WebViewPage = require('../pageobjects/webview.page');
const navigatePage = require('../pageobjects/navigate.page');
const webviewPage = require('../pageobjects/webview.page');

describe('WebView Page Tests', () => {
    beforeEach(async () => {
        
        await navigatePage.verifyWebview();        
        await navigatePage.navigateToWebview();  
        
    });

    it('deve verificar se o botão "Get Started" está visível', async () => {
        // Verificar se o botão 'Get Started' está visível
        await webviewPage.closeDocument();
        await WebViewPage.verifyGetStartedVisible();
    });
    
    it('deve verificar se o botão "Why WebdriverIO?" está visível', async () => {
        // Verificar se o botão 'Why WebdriverIO?' está visível
        await WebViewPage.verifyWhyWebdriverIOVisible();
    });
    
    it('deve verificar se o botão "View on GitHub" está visível', async () => {
        // Verificar se o botão 'View on GitHub' está visível
        await WebViewPage.verifyViewOnGitHubVisible();
    });
    

    
});
