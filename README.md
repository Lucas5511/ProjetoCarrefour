# Projeto de Automação de Testes - Carrefour

Este projeto tem como objetivo a automação de testes para uma aplicação utilizando o framework WebdriverIO, com a integração de Appium para testes em dispositivos móveis (Android e iOS), Mocha como gerenciador de testes, Chai para asserts, e a geração de relatórios com Allure Report. A execução dos testes pode ser realizada tanto localmente quanto na cloud de dispositivos BrowserStack. O ambiente de integração contínua (CI/CD) está configurado para rodar os testes através do GitLab CI/CD.

## Tecnologias e Ferramentas Utilizadas

- **Linguagem**: JavaScript
- **Framework**: WebdriverIO
- **Biblioteca**: Appium (para testes móveis)
- **Gerenciador de Testes**: Mocha
- **Asserts**: Chai
- **Relatórios**: Allure Report
- **CI/CD**: GitLab CI/CD
- **Cloud de Dispositivos**: BrowserStack
- **Controle de Versão**: Git
- **Gerenciador de Pacotes**: npm

## Pré-Requisitos

Antes de começar, certifique-se de que você tenha as seguintes ferramentas instaladas no seu sistema:

- **Node.js** (recomenda-se a versão 16 ou superior): [Node.js Download](https://nodejs.org/)
- **Git**: [Git Download](https://git-scm.com/)
- **Conta no BrowserStack** (se necessário para execução em dispositivos móveis)

## Instalação e Configuração

## Configuração do Ambiente

### 1. Clonar o Repositório
Clone este repositório para sua máquina local:

```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### 2. Instale as Dependências
Dentro da pasta do projeto, instale as dependências do projeto com o npm:

```
npm install
```
### 3. Configuração do WebdriverIO
A configuração do WebdriverIO está localizada no arquivo config/wdio.conf.js. Verifique se as configurações de browser (para testes em Web) e dispositivos (para testes móveis com Appium) estão corretas. Para executar os testes no BrowserStack, certifique-se de adicionar as credenciais de sua conta:

```
services: [
    ['browserstack', {
        user: 'YOUR_BROWSERSTACK_USERNAME',
        key: 'YOUR_BROWSERSTACK_ACCESS_KEY'
    }]
]
```
### 4. Configuração do Appium
A configuração do Appium pode ser encontrada no arquivo config/appium.config.js. Certifique-se de que o caminho para os aplicativos (APK/IPA) esteja correto e que as capacidades para dispositivos móveis estejam configuradas adequadamente.

### 5. Configuração do CI/CD com GitLab
No GitLab CI/CD, a configuração do pipeline está em .gitlab-ci.yml. Esse arquivo configura o ambiente para execução dos testes automatizados a cada commit ou push para o repositório.

Aqui está um exemplo básico de configuração para o GitLab CI/CD:
```

stages:
  - test

test:
  stage: test
  image: node:16
  script:
    - npm install
    - npm run test:android:browserstack
  artifacts:
    paths:
      - allure-results
    expire_in: 1 week
```
### 6. Configuração do Allure Report
Para instalar o Allure Report, execute:
```
npm install --save-dev allure-commandline
```
No arquivo wdio.conf.js, configure o relatório Allure:
```
reporters: ['allure'],
reporterOptions: {
    allure: {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false
    }
}
```
Após a execução dos testes, gere o relatório Allure com o seguinte comando:
```
npm run allure-report
```
### 7. Comandos para Executar os Testes
No seu package.json, foram configurados diferentes scripts para rodar os testes em diferentes plataformas e ambientes.

Execução Local
Para rodar os testes em um dispositivo Android ou iOS localmente:

Android (Local):

```
npm run test:android:local
```
iOS (Local):

```
npm run test:ios:local
```
Execução na Cloud (BrowserStack)
Para rodar os testes na cloud utilizando BrowserStack:

Android (BrowserStack):

```
npm run test:android:browserstack
```
iOS (BrowserStack):

```
npm run test:ios:browserstack
```
Execução de Todos os Testes
Para rodar todos os testes, independentemente da plataforma, use o comando:

```
npm run test
```
Geração de Relatório Allure
Após a execução dos testes, para gerar e abrir o relatório Allure, use o comando:

```
npm run allure-report
```
