const WebViewPage = require('../pageobjects/webview.page');
const navigatePage = require('../pageobjects/navigate.page');

describe('WebView Page Tests', () => {
    beforeEach(async () => {
        // Verificar se a página Webview está visível antes de cada teste
        await navigatePage.verifyWebview();
        // Navegar para a página Webview (se necessário)
        await navigatePage.navigateToWebview();  // Supondo que esse seja o método correto
    });

    it('deve verificar se o botão "Get Started" está visível', async () => {
        // Verificar se o botão 'Get Started' está visível
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
