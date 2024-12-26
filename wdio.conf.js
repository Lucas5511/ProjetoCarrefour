const isBrowserStack = process.env.TEST_ENV === 'browserstack'; // Define se os testes são no BrowserStack
const isIOS = process.env.PLATFORM === 'ios'; // Define se a plataforma é iOS
const isAndroid = process.env.PLATFORM === 'android'; // Define se a plataforma é Android


// IDs do BrowserStack separados para Android e iOS
const browserStackAppId = {
  android: 'bs://7c53b784f240cbdf164009323045847d0bff5c3b',
  ios: 'bs://1d2c4cfb0484dc888b835fae919dbcb7635346d1',
};

exports.config = {
  runner: 'local',  
  maxInstances: 1,
  port: isBrowserStack ? 443 : 4723,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: isBrowserStack ? ['browserstack'] : ['appium'], // Serviços do Appium ou BrowserStack
  framework: 'mocha',
  updateJob: false,
  specs: [
    '../test/specs/**/*.spec.js', // Caminho dos testes
  ],
  exclude: [],
  

  appium: {
    command: 'appium',
  },

  capabilities: isBrowserStack
    ? [
        // Configurações para o BrowserStack
        {
          platformName: isIOS ? 'iOS' : 'Android',
          'appium:platformVersion': isIOS ? '16' : '12.0',
          'appium:deviceName': isIOS ? 'iPhone 14 Pro Max' : 'Samsung Galaxy S21',          
          'appium:automationName': isIOS ? 'XCUITest' : 'UiAutomator2',
          'appium:app': isIOS ? browserStackAppId.ios : browserStackAppId.android, // App ID dinâmico
          user: process.env.BROWSERSTACK_USERNAME || 'lucasdeoliveiras_BCfDNo',
          key: process.env.BROWSERSTACK_ACCESS_KEY || 'H6yDfhBWyi31rJu69oYd',
        },
      ]
    : [
        // Configurações locais
        isAndroid
          ? {
              platformName: 'Android',
              'appium:platformVersion': '15.0',
              'appium:deviceName': 'emuladortestes', // Nome do emulador Android
              'appium:automationName': 'UiAutomator2',              
              'appium:app': './test/android.wdio.native.app.v1.0.8.apk', // Caminho do APK local
              'appium:noReset': false,
              'appium:autoGrantPermissions': true,
              
            }
          : {
              platformName: 'iOS',
              'appium:platformVersion': '15.0',
              'appium:deviceName': 'iPhone 12', // Nome do simulador iOS
              'appium:automationName': 'XCUITest',
              'appium:app': './test/ios.wdio.native.app.v1.0.8.app', // Caminho do .app ou .ipa local
              'appium:noReset': true,
              'appium:autoGrantPermissions': true,
            },
      ],

  appiumServer: {
    protocol: 'http',
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub',
  },

  reporters: ['spec', ['allure', { outputDir: 'allure-results' }], 'json'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
